import * as cdk from 'aws-cdk-lib'
import { Construct } from "constructs"
import { lambdaStack } from './lambda-stack' 

export class PipelineAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps & { stageName: string }) {
    super(scope, id, props);

    new lambdaStack(this, `LambdaStack-${props.stageName}`, {
      stageName: props.stageName
    });
  }
}
