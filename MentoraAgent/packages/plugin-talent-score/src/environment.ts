import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const talentScoreEnvSchema = z.object({
    TALENT_PASSPORT_API_KEY: z
        .string()
        .min(1, "Talent Passport API key is required"),
    TALENT_PASSPORT_API_URL: z
        .string()
        .min(1, "Talent Passport API URL is required"),
});

export type TalentScoreConfig = z.infer<typeof talentScoreEnvSchema>;

export async function validateTalentScoreConfig(
    runtime: IAgentRuntime
): Promise<TalentScoreConfig> {
    try {
        const config = {
            TALENT_PASSPORT_API_KEY: runtime.getSetting(
                "TALENT_PASSPORT_API_KEY"
            ),
            TALENT_PASSPORT_API_URL: runtime.getSetting(
                "TALENT_PASSPORT_API_URL"
            ),
        };

        return talentScoreEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Talent Passport configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
