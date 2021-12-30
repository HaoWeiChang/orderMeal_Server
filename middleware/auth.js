exports.Auth_Session = (req, res, next) => {
  if (!req.session.data) {
    return res.status(403).json({ error: "Session Invalid" });
  }
  next();
};
