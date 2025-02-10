import { UserContext } from './user.context';

export class AutomationPipeline {
  private context: UserContext;
  private steps: (() => Promise<void>)[] = [];

  constructor() {
    this.context = new UserContext();
  }

  addStep(step: (context: UserContext) => Promise<void>) {
    this.steps.push(() => step(this.context));
    return this;
  }

  async run() {
    for (const step of this.steps) {
      await step();
    }
  }

  getContext() {
    return this.context;
  }
}
