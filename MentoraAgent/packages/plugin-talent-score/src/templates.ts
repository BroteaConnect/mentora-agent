export const getTalentScoreTemplate = `Respond with a JSON object containing the talent score for the given wallet address.
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
