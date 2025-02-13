import type { ActionExample } from "@elizaos/core";

export const getMentorsExamples = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me available mentors"
            }
        },
        {
            user: "{{user2}}",
            content: {
                text: "I'll retrieve the list of available mentors for you.",
                action: "GET_MENTORS"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Who can mentor me?"
            }
        },
        {
            user: "{{user2}}",
            content: {
                text: "Let me fetch the current mentors and their expertise areas.",
                action: "GET_MENTORS"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "List all mentors"
            }
        },
        {
            user: "{{user2}}",
            content: {
                text: "I'll get you the complete list of mentors with their profiles.",
                action: "GET_MENTORS"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Get mentor information"
            }
        },
        {
            user: "{{user2}}",
            content: {
                text: "I'll show you the available mentors and their details.",
                action: "GET_MENTORS"
            }
        }
    ]
];
