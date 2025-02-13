export const getMentorsTemplate = `
You are helping to retrieve mentor information from the Mentora platform.

Context:
{{recentMessages}}

Instructions:
1. Analyze if the user is asking about mentors
2. If confirmed, set requestType to "mentors"
3. If not about mentors, do not set requestType

Example user messages:
- "Show me available mentors"
- "Who can mentor me?"
- "List all mentors"
- "Get mentor information"

Response format:
{
    "requestType": "mentors" | null
}
`;
