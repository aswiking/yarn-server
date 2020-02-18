

export default function errorHandlingMiddleware(err, req, res, next) {
  console.error(err);
  if (err.status) {
    //i.e. it was something we've thrown
    res.status(err.status).json({
      status: err.status,
      messages: [err.messages]
    });
  } else {
    //something we didn't throw
    console.log(err)
    res.status(500).json({
      status: 500,
      messages: ["Internal server error"]
    });
  }
}
