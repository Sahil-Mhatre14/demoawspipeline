import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //Code Pipeline
    const democicdpipeline = new CodePipeline(this, 'demopipeline14', {
      pipelineName: 'DemoPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Sahil-Mhatre14/demoawspipeline', 'main'),
        commands: ["npm ci", "npm run build", "npx cdk synth"]
      })
    });
  }
}
