import * as cdk from 'aws-cdk-lib'
import { Construct } from "constructs"
import { lambdaStack } from './lambda-stack' 

interface PipelineAppStageProps extends cdk.StageProps {
  stageName: string;
}

export class PipelineAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: PipelineAppStageProps) {
    super(scope, id, props);

    new lambdaStack(this, `LambdaStack-${props.stageName}`, {
      stageName: props.stageName
    });
  }
}
