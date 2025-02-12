import { ActionExample } from "@elizaos/core";

export const getTalentScoreExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's my talent score?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check your talent score.",
                action: "GET_TALENT_SCORE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Your talent score is 85/100. This score is based on your professional experience, skills, and community engagement.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "How can I improve my talent score?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me analyze your current talent score components.",
                action: "GET_TALENT_SCORE_DETAILS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Based on your profile analysis, you can improve your talent score by: 1) Adding more details about your work experience, 2) Completing your skills section, and 3) Increasing your community participation through mentoring and collaboration.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the average talent score in my industry?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check the industry benchmarks for talent scores.",
                action: "GET_INDUSTRY_TALENT_SCORE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "In the software development industry, the average talent score is 78/100. You're performing above average compared to your peers.",
            },
        },
    ],
];
