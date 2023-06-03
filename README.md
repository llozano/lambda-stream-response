# lambda-stream-response
Streaming response with a AWS lambda

## Motivation
AWS Lambda functions now support streaming the response, which is a pretty cool feature. However, implementing a response streaming AWS Lambda for Node.js in _TypeScript_ can be a bit challenging. Since the `awslambda namespace` is set globally in the Node.js micro-environment that runs the lambda function, you may lose type verification support, autocomplete, and other conveniences that modern text editors provide. One not-so-appealing option is to split the implementation, keeping the parts with `awslambda` references in a _JavaScript_ file and the rest in _TypeScript_. This requires setting `allowJs: true`, and well, it's not ideal 😒.

To address this issue, I wrote a custom type `(src/@types/awslambda)` to keep the entire codebase in _TypeScript_. This way, when the code is transpiled, all references to the `awslambda namespace` remain clean and intact. No need of imports or including another 3rd-party library to your
project.

You can find the handler in the `report.ts` file.


## Getting Started

To compile the source code:

```bash
npm run build
```
