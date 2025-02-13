import { type IAgentRuntime } from "@elizaos/core";

export interface MentoraConfig {
    baseUrl: string;
}

export const validateMentoraConfig = async (
    runtime: IAgentRuntime
): Promise<MentoraConfig> => {
    const baseUrl = process.env.MENTORA_API_URL;

    if (!baseUrl) {
        throw new Error(
            "MENTORA_API_URL environment variable is required for the Mentora plugin"
        );
    }

    return {
        baseUrl,
    };
};
