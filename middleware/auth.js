exports.Auth_Session = async (req, res, next) => {
  if (!req.session.data) {
    return res.status(403).json({ error: "Session Invalid" });
  }
  next();
};
