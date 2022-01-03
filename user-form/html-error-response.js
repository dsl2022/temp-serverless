module.exports = function htmlErrorResponse(body) {
  return {
    statusCode: 500,
    body: body,
    headers: {
      "Content-Type": "text/html",
    },
  };
};
