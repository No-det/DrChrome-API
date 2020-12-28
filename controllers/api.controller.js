const User = require("../models/user.model");

exports.addUser = async (req, res, next) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    {
      new: true,
    }
  );
  if (updatedUser) return res.status(200).send(updatedUser);
  res.status(400).send("Pani paali moneee");
};
