function errorHandler(err, req, res, next) {
  res.status(500);
  res.json({ message: "Internal server error occured" });
}

module.exports = errorHandler;
