import { Plugin } from "@elizaos/core";
import { getTalentScoreAction } from "./actions";

export * as actions from "./actions";

export const talentScorePlugin: Plugin = {
    name: "talent-score",
    description: "Talent Score plugin for Eliza",
    actions: [getTalentScoreAction],
    evaluators: [],
    providers: [],
};
export default talentScorePlugin;
