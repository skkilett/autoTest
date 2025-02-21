import { UserContext } from './user.context';

export type StepFunction = (context: UserContext) => Promise<void>;

export interface PipelineStep {
  step: StepFunction;
  timeout?: number; 
}

export class AutomationPipeline {
  private context: UserContext;
  private steps: PipelineStep[] = [];

  constructor() {
    this.context = new UserContext();
  }


  addStep(step: StepFunction, timeout?: number): this {
    this.steps.push({ step, timeout });
    return this;
  }


  async run(): Promise<void> {
    for (const { step, timeout } of this.steps) {
      if (timeout) {
        await this.runStepWithTimeout(step, timeout);
      } else {
        await step(this.context);
      }
    }
  }

  private async runStepWithTimeout(step: StepFunction, timeout: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Step timed out after ${timeout}ms`));
      }, timeout);

      step(this.context)
        .then(() => {
          clearTimeout(timer);
          resolve();
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  getContext(): UserContext {
    return this.context;
  }
}
