const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      fullName: req.body.fullName,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hash
    })
    user.save().then((data) => {
      res.status(200).json({
        message: "New Person is Created",
        //result: data
      })
    }).catch((error) => {
      res.status(500).json({
        message: error.message
      })
    })
  })
}
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  console.log("User", req.body.email)
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (!user) {
      return res.status(401).send({
        message: "Please use a Valid Email or Pass"
      })
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, fetchedUser.password)
  }).then((result) => {
    if (!result) {
      return res.status(401).send({
        message: "Please use a Valid Email or Pass"
      })
    }
    const token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    }, process.env.jwtToken, {
      expiresIn: "1h"
    })
    res.status(200).send({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    })
  }).catch((error) => {
    return res.status(401).send({
      message: "Something Went Wrong Please Try Again Later"
    })
  })
}
exports.getAllUsers = (req, res, next) => {
  let Users;
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const Query = User.find({},{password: 0});
  if (pageSize && currentPage) {
    Query.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  Query.then((document) => {
    Users = document
    return User.count()
  }).then((count) => {
    res.status(200).json({
      message: "Collection of Users",
      People: Users,
      totalPersons: count
    })
  }).catch(error => {
      res.status(500).json({
        message: "Something Went Wrong Please Try Again Later",
        error: error
      })
    })
}

exports.getSingleUser = (req, res, next) => {

  User.findById({
      _id: req.params.userId
    }, {
      password: 0,
      __v: 0,
      _id: 0,
      updatedAt: 0
    }).then((result) => {
      if (result.length != 0) {
        res.status(200).json({
          message: "User  Found",
          user: result
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        message: "User Does Not exit",
      });
    })
}
exports.updatePersonDetail = (req, res, next) => {
  const user = new User({
    _id: req.params.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  });
  User.updateOne({
    _id: req.params.userId
  }, user).then(result => {
    if (result.n > 0) {
      res.status(200).json("Updated Succesfully");
    }
  }).catch(error => {
    res.status(500).json({
      message: error
    })
  })
}
exports.deleteUser = (req, res, next) => {
  User.deleteOne({
      _id: req.params.userId
    }).then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "User Deleted",
          result: result
        })

      } else {
        res.status(200).json({
          message: "User Not Found",
          result: result
        })
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: "Something Went Wrong Please Try Again Later",
        error: error
      });
    })
}
