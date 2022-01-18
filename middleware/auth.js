exports.Auth_Session = (req, res, next) => {
  if (!req.session.data) {
    return res.status(403).json({ error: "憑證失效" });
  }
  next();
};

exports.Manager_Auth_Sessiom = (req, res, next) => {
  const Manager_IDList = [6];
  const Session_Data = req.session.data;
  if (!Session_Data) {
    return res.status(403).json({ error: "憑證失效" });
  } else if (!Manager_IDList.includes(Session_Data.id)) {
    return res.status(403).json({ error: "非管理人員" });
  } else next();
};
