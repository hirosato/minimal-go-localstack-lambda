#!env bash
docker-compose down -v
docker-compose up -d
cd cdk
cdklocal bootstrap
cdklocal deploy --all --require-approval never
echo "aws logs tail --follow --endpoint-url=http://localhost:4566 /aws/lambda/lambda"