import { UserContext } from './user.context';

export class AutomationPipeline {
  private context: UserContext;
  private steps: ((context: UserContext) => Promise<void>)[] = [];

  constructor() {
    this.context = new UserContext();
  }

  addStep(step: (context: UserContext) => Promise<void>) {
    this.steps.push(step);
    return this;
  }

  async run() {
    for (const step of this.steps) {
      try {
        await step(this.context);
      } catch (error) {
        console.error(`Step failed: ${error.message}`);
      }
    }
  }

  getContext() {
    return this.context;
  }
}
