import type { Plugin } from "@elizaos/core";
import { getMentorsAction } from "./actions/getMentors";

export const mentoraPlugin: Plugin = {
    name: "mentora",
    description: "Retrieve mentor data from Mentora platform",
    actions: [getMentorsAction],
    evaluators: [],
    providers: [],
};

export default mentoraPlugin;
