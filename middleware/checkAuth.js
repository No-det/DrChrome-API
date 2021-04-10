// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers["auth-token"];
//   if (!token) return res.status(401).json({ message: "Access Denied!" });
//   try {
//     const decoded = jwt.verify(token, "damn 2020");
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid Token!" });
//   }
// };

module.exports = (req, res, next) => {
  const idToken = req.headers["auth-token"];
  if (!idToken) return res.status(401).json({ message: "Access Denied!" });
  try {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.userData = decodedToken;
        console.log(decodedToken);
      });
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};
