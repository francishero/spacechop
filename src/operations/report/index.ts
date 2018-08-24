import ImageDefinition, { DefinitionRequirement } from '../../imagedef';
import Operation from './../operation';
import { ReportConfig } from './types';

export const reportOptions = (config: ReportConfig, state: ImageDefinition): string[] => {
  switch (config.format) {
    case 'json':
    default:
      const data = JSON.stringify(state);
      return [
        `${JSON.stringify(data)}`,
      ];
  }
};

export const transformState = (config: ReportConfig, state: ImageDefinition): ImageDefinition => {
  return {
    ...state,
    mime: 'application/json',
  };
};

export const defaultConfig: ReportConfig = {
  format: 'json',
};

export default class Report implements Operation {
  public config: ReportConfig;
  constructor(config: ReportConfig) {
    this.config = { ...defaultConfig, ...config };
  }

  public requirements(): DefinitionRequirement[] {
    return [];
  }

  public execute(state: ImageDefinition): { command: string, state: ImageDefinition } {
    const options = reportOptions(this.config, state);
    return {
      state: transformState(this.config, state),
      command: 'echo ' + options.join(' '),
    };
  }
}