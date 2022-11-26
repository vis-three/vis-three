import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface GroupConfig extends ObjectConfig {
  children: string[];
}

export const getGroupConfig = function (): GroupConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.GROUP,
    children: [],
  });
};
