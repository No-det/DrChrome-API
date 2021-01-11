const router = require("express").Router();
const { v4: uuid4 } = require("uuid");

router.post("/", (req, res) => {
  return res.status(200).send({ meetId: uuid4() });
});

router.get("/:meetId", (req, res) => {
  return res.status(200).send({ meetId: req.params.meetId });
});

router.get("/", (req, res) => {
  res.status(200).send({ message: "Routes for Video Conference" });
});

module.exports = router;
