var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/actions/index.ts
var actions_exports = {};
__export(actions_exports, {
  getTalentScoreAction: () => getTalentScoreAction
});

// src/actions/getTalentScore.ts
import { composeContext, elizaLogger as elizaLogger2 } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
  ModelClass
} from "@elizaos/core";

// src/environment.ts
import { z } from "zod";
var talentScoreEnvSchema = z.object({
  TALENT_PASSPORT_API_KEY: z.string().min(1, "Talent Passport API key is required"),
  TALENT_PASSPORT_API_URL: z.string().min(1, "Talent Passport API URL is required")
});
async function validateTalentScoreConfig(runtime) {
  try {
    const config = {
      TALENT_PASSPORT_API_KEY: runtime.getSetting(
        "TALENT_PASSPORT_API_KEY"
      ),
      TALENT_PASSPORT_API_URL: runtime.getSetting(
        "TALENT_PASSPORT_API_URL"
      )
    };
    return talentScoreEnvSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("\n");
      throw new Error(
        `Talent Passport configuration validation failed:
${errorMessages}`
      );
    }
    throw error;
  }
}

// src/templates.ts
var getTalentScoreTemplate = `Respond with a JSON object containing the talent score for the given wallet address.
The response must include:
- score: A number between 0 and 300
- walletAddress: The Ethereum wallet address being evaluated

Example response:
\`\`\`json
{
    "score": 85,
    "walletAddress": "{{walletAddress}}"
}
\`\`\`
{{recentMessages}}
Extract the wallet address from the most recent message.
Respond with a JSON markdown block containing both score and walletAddress.`;

// src/examples.ts
var getTalentScoreExamples = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "What's my talent score?"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "I'll check your talent score.",
        action: "GET_TALENT_SCORE"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "Your talent score is 85/100. This score is based on your professional experience, skills, and community engagement."
      }
    }
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "How can I improve my talent score?"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me analyze your current talent score components.",
        action: "GET_TALENT_SCORE_DETAILS"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "Based on your profile analysis, you can improve your talent score by: 1) Adding more details about your work experience, 2) Completing your skills section, and 3) Increasing your community participation through mentoring and collaboration."
      }
    }
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "What's the average talent score in my industry?"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "I'll check the industry benchmarks for talent scores.",
        action: "GET_INDUSTRY_TALENT_SCORE"
      }
    },
    {
      user: "{{agent}}",
      content: {
        text: "In the software development industry, the average talent score is 78/100. You're performing above average compared to your peers."
      }
    }
  ]
];

// src/services.ts
import { elizaLogger } from "@elizaos/core";
var createTalentScoreService = (apiKey, baseUrl) => {
  const getPassportInfo = async (walletAddress) => {
    if (!apiKey || !walletAddress || !baseUrl) {
      throw new Error("Invalid parameters");
    }
    try {
      const url = new URL(`${baseUrl}/passports/${walletAddress}`);
      elizaLogger.info(
        `Fetching passport info for wallet address: ${walletAddress}`
      );
      elizaLogger.info(`API key: ${apiKey}`);
      elizaLogger.info(`URL: ${url}`);
      const response = await fetch(url, {
        headers: {
          "X-API-KEY": apiKey
        }
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `No passport found for wallet address: ${walletAddress}`
          );
        }
        const error = await response.json();
        throw new Error(error?.message || response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Talent Passport API Error:", error.message);
      throw error;
    }
  };
  return { getPassportInfo };
};

// src/actions/getTalentScore.ts
var getTalentScoreAction = {
  name: "GET_TALENT_SCORE",
  similes: [
    "TALENT_SCORE",
    "TALENT_SCORE_CHECK",
    "TALENT_SCORE_REPORT",
    "TALENT_SCORE_UPDATE",
    "TALENT_SCORE_CHECK",
    "TALENT_SCORE_OUTSIDE"
  ],
  description: "Get the talent score for a given wallet address",
  validate: async (runtime) => {
    await validateTalentScoreConfig(runtime);
    return true;
  },
  handler: async (runtime, message, state, _options, callback) => {
    if (!state) {
      state = await runtime.composeState(message);
    }
    state = await runtime.updateRecentMessageState(state);
    const talentScoreContext = composeContext({
      state,
      template: getTalentScoreTemplate
    });
    const content = await generateMessageResponse({
      runtime,
      context: talentScoreContext,
      modelClass: ModelClass.SMALL
    });
    elizaLogger2.info(`Content: ${JSON.stringify(content)}`);
    const hasWalletAddress = content?.walletAddress && !content?.error;
    if (!hasWalletAddress) {
      return;
    }
    const config = await validateTalentScoreConfig(runtime);
    const apiKey = config.TALENT_PASSPORT_API_KEY;
    const baseUrl = config.TALENT_PASSPORT_API_URL;
    const talentScoreService = createTalentScoreService(apiKey, baseUrl);
    try {
      elizaLogger2.info(`Wallet address: ${content.walletAddress}`);
      const passportData = await talentScoreService.getPassportInfo(
        String(content?.walletAddress || "")
      );
      elizaLogger2.success(
        `Successfully fetched passport info for ${content.walletAddress}`
      );
      if (callback) {
        callback({
          text: `The talent score for wallet ${content.walletAddress} is ${passportData.passport.score}. This score is based on ${passportData.passport.activity_score} activity stamps across various platforms and protocols.`,
          content: passportData
        });
        return true;
      }
    } catch (error) {
      elizaLogger2.error("Error in GET_TALENT_SCORE handler:", error);
      callback({
        text: `Error fetching passport info: ${error.message}`,
        content: { error: error.message }
      });
      return false;
    }
    return;
  },
  examples: getTalentScoreExamples
};

// src/index.ts
var talentScorePlugin = {
  name: "talent-score",
  description: "Talent Score plugin for Eliza",
  actions: [getTalentScoreAction],
  evaluators: [],
  providers: []
};
var index_default = talentScorePlugin;
export {
  actions_exports as actions,
  index_default as default,
  talentScorePlugin
};
//# sourceMappingURL=index.js.map