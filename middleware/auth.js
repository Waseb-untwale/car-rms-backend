const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Auhentication" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
      if (err) return res.status(400).json({ msg: "Invalid Aurthentication" });
      console.log(users)
      req.user = users;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
