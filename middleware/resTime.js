const resTimes = () => {
  return function (req, res, next) {
    req._startTime = new Date();
    var calResponseTime = () => {
      var now = new Date();
      var deltaTime = now - req._startTime;
      console.log(deltaTime + "ms");
    };
    res.once("finish", calResponseTime);
    res.once("close", calResponseTime);
    return next();
  };
};
module.exports = resTimes;
