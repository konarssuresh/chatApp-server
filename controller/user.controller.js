let userModel = require("../model/user.model");

let signUpUser = (req, res, next) => {
  const { userId, firstName, password, lastName, dateOfBirth, userType } =
    req.body;
  userModel.findOne({ userId: userId.toLowerCase() }, (err, result) => {
    if (!err) {
      if (result === null) {
        userModel.insertMany(
          {
            userId: userId.toLowerCase(),
            password,
            firstName,
            lastName,
            dateOfBirth,
            userType,
          },
          (err) => {
            if (!err) {
              res.json({ message: "User added successfully" });
            } else {
              next(err);
            }
          }
        );
      } else {
        res.json({ message: "user with this user id already exists." });
      }
    } else {
      next(err);
    }
  });
};

let loginUser = (req, res, next) => {
  let { userId, password } = req.body;
  const id = userId.toLowerCase();
  const passwd = password;

  userModel.find({ userId: id, password: passwd }, (err, result) => {
    if (!err) {
      if (result === null || result.length === 0) {
        res.send({ message: "user id and password does not match" });
      } else {
        res.send({ userData: result });
      }
    } else {
      next(err);
    }
  });
};

let getAllUsers = (req, res, next) => {
  userModel.find({}, (err, results) => {
    if (!err) {
      const usersList = results.map(({ userId, firstName, lastName }) => ({
        userId,
        name: `${firstName} ${lastName}`,
      }));
      res.send(usersList);
    } else {
      next(err);
    }
  });
};

module.exports = { signUpUser, getAllUsers, loginUser };
