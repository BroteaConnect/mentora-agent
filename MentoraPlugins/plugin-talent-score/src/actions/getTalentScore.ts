import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { validateTalentScoreConfig } from "../environment";
import { getTalentScoreTemplate } from "../templates";
import { getTalentScoreExamples } from "../examples";
import { createTalentScoreService } from "../services";

export const getTalentScoreAction: Action = {
    name: "GET_TALENT_SCORE",
    similes: [
        "TALENT_SCORE",
        "TALENT_SCORE_CHECK",
        "TALENT_SCORE_REPORT",
        "TALENT_SCORE_UPDATE",
        "TALENT_SCORE_CHECK",
        "TALENT_SCORE_OUTSIDE",
    ],
    description: "Get the talent score for a given wallet address",
    validate: async (runtime: IAgentRuntime) => {
        await validateTalentScoreConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        // state -> context
        const talentScoreContext = composeContext({
            state,
            template: getTalentScoreTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: talentScoreContext,
            modelClass: ModelClass.SMALL,
        });

        elizaLogger.info(`Content: ${JSON.stringify(content)}`);

        // parse content
        const hasWalletAddress = content?.walletAddress && !content?.error;

        if (!hasWalletAddress) {
            return;
        }

        // Instantiate API service
        const config = await validateTalentScoreConfig(runtime);
        const apiKey = config.TALENT_PASSPORT_API_KEY;
        const baseUrl = config.TALENT_PASSPORT_API_URL;
        const talentScoreService = createTalentScoreService(apiKey, baseUrl);
        // Fetch weather & respond
        try {
            elizaLogger.info(`Wallet address: ${content.walletAddress}`);

            const passportData = await talentScoreService.getPassportInfo(
                String(content?.walletAddress || "")
            );
            elizaLogger.success(
                `Successfully fetched passport info for ${content.walletAddress}`
            );

            if (callback) {
                callback({
                    text: `The talent score for wallet ${content.walletAddress} is ${passportData.passport.score}. This score is based on ${passportData.passport.activity_score} activity stamps across various platforms and protocols.`,
                    content: passportData,
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_TALENT_SCORE handler:", error);

            callback({
                text: `Error fetching passport info: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: getTalentScoreExamples as ActionExample[][],
} as Action;
