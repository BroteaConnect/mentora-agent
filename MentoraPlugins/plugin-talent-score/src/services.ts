import { elizaLogger } from "@elizaos/core";
import { PassportResponse } from "./types";

export const createTalentScoreService = (apiKey: string, baseUrl: string) => {
    const getPassportInfo = async (
        walletAddress: string
    ): Promise<PassportResponse> => {
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
                    "X-API-KEY": apiKey,
                },
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
