import { Action, Plugin } from '@elizaos/core';

declare const getTalentScoreAction: Action;

declare const index_getTalentScoreAction: typeof getTalentScoreAction;
declare namespace index {
  export { index_getTalentScoreAction as getTalentScoreAction };
}

declare const talentScorePlugin: Plugin;

export { index as actions, talentScorePlugin as default, talentScorePlugin };
