package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Result struct {
	IsBase64Encoded bool              `json:"isBase64Encoded"`
	Body            string            `json:"body"`
	HttpStatusCode  int               `json:"statusCode"`
	Headers         map[string]string `json:"headers"`
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Result, error) {
	result := Result{
		IsBase64Encoded: false,
		Body:            "Pong",
		HttpStatusCode:  200,
	}
	return result, nil
}

func main() {
	lambda.Start(HandleRequest)
}
