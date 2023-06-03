# lambda-stream-response
Streaming response with a AWS lambda

## Motivation
AWS Lambda functions now support streaming the response. Some configuration is
required, some terms and conditions but it's pretty cool feature.

To implement a response streaming AWS Lambda for NodeJS in Typescript,
the type verification support, autocomplete and other goodies that text editors
automate for you these days will be missing since the `awslambda` namespace is
been set globally in the NodeJS micro-environment that runs the lambda function.
One ugly option is to split the implementation that contains all `awslambda` references
into a _Javascript_ file and the rest done in _Typescript_, set `allowJs: true` and 😒... Yeah!, that sounds awful.

My motivation was to find a better way to keep all the code base in _Typescript_, so
Wrote a custom type `(src/@types/awslambda)` to solve this problem. When code is transpiled
all references to the `awslambda` namespace remained nice an clean.

The handler can be found in the `report.ts` file.

## Getting Started

To compile the source code:

```bash
npm run build
```
