import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { RestApi, Resource } from "aws-cdk-lib/aws-apigateway";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "lambda", {
      functionName: "lambda",
      runtime: lambda.Runtime.GO_1_X,
      handler: "main",
      code: lambda.Code.fromAsset("../", {
        bundling: {
          image: lambda.Runtime.GO_1_X.bundlingImage,
          command: [
            "bash",
            "-c",
            [
              "export GOCACHE=/asset-input/go-cache",
              "export GOMODCACHE=/asset-input/go-mod-cache",
              "go test -v",
              "GOOS=linux go build -o /asset-output/main -buildvcs=false",
            ].join(" && "),
          ],
        },
      }),
      environment: {
        TEST: "test",
      },
    });

    const api = new RestApi(this, "api");

    const ping = api.root.addResource("ping");
    ping.addMethod("GET", new apigateway.LambdaIntegration(handler));
  }
}
