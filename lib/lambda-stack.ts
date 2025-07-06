import * as cdk from 'aws-cdk-lib'
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface LambdaStackProps extends cdk.StackProps {
  stageName: string;
}
export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const demolambda = new lambda.Function(this, `lambda-${props.stageName}`, {
            functionName: 'lambda14',
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromInline('exports.handler = _ => "Hello CDK";')
        });
    }
}