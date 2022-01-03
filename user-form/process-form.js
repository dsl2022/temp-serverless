const htmlResponse = require("./html-response");
const htmlErrorResponse = require("./html-error-response");
const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.lambdaHandler = async (event, context) => {
  const bucketName = process.env.UPLOAD_S3_BUCKET;
  try {
    await s3
      .putObject({
        Bucket: bucketName,
        Key: context.awsRequestId,
        Body: JSON.stringify(event.body),
      })
      .promise();
    const thanksHtml = `
    <html>
    <head>
      <meta charset="utf-8"/>
    </head>
    <body>
      <h1>Thanks</h1>
      <p>We received your submission</p>
      <p>Reference: ${context.awsRequestId}</p>
      </p>
    </body>
    </html>
  `;

    return htmlResponse(thanksHtml);
  } catch (err) {
    const errorHtml = `
    <html>
    <head>
      <meta charset="utf-8"/>
    </head>
    <body>
      <h1>Error occured</h1>
      <p>${err}</p>
      <p>Reference: ${context.awsRequestId}</p>
      </p>
    </body>
    </html>
  `;
    return htmlErrorResponse(errorHtml);
  }
};
