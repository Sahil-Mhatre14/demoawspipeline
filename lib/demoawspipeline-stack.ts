import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalAction } from 'aws-cdk-lib/aws-codepipeline-actions';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //Code Pipeline
    const democicdpipeline = new CodePipeline(this, 'demopipeline14', {
      pipelineName: 'DemoPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Sahil-Mhatre14/demoawspipeline', 'master'),
        commands: ["npm ci", "npm run build", "npx cdk synth"]
      })
    });

    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '489493636977', region: 'us-west-1' },
      stageName: 'test'
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '489493636977', region: 'us-west-1' },
      stageName: 'prod'
    }));
  }
}
