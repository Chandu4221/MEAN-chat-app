const User = require("../../models/users");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = (function () {
    
    
    /**
   * @params request, response
   * @For login for the user
   */
  this.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body.data;
      const user = await User.findOne({ "username":username });
      if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRETE, {
          expiresIn: "3649635 days"
        });

        // return the JWT token for the future API calls
        return {
          data: {
            AuthenticationResult: {
              ExpiresIn: 3600,
              TokenType: "Bearer",
              AccessToken: token,
            },
          },
          user: {
            username,
          },
        };
      } else {
        return {
          errorCode: "1011",
          message: "Incorrect username or password",
          statusCode: 403,
        };
      }
    } catch (error) {
      TE(error);
    }
  };
    
    
    /**
   * @params request, response
   * @For creating a new user
   */
  this.createUser = async ({body}) => {
    try {
      if (!body.data) return TE("data object not passed.");
      const { username, password,name, phoneNumber } = body.data;

      if (!username)
        return TE({
          errorCode: 1010,
          message: "Invalid phone number format.",
          statusCode: 400,
        });

      // /* validate */
      const isExisting = await User.findOne({ username });
      if (isExisting) {
        return {
          errorCode: 1000,
          message: "username already exists",
          statusCode: 400,
        };
      }
      let newUser = new User({
        username,
        name,
        phoneNumber,
      });

      /* hash password */
      if (password) {
        newUser.hash = bcrypt.hashSync(password, 10);
      }
      await newUser.save();

      let hide = username.split("@")[0].length - 2; //<-- number of characters to hide

      var r = new RegExp(".{" + hide + "}@", "g");

      let updatedEmail = username.replace(r, "***@");
      if (!newUser) {
        return TE("There is some error creating user.");
      }
      return {
        data: {
          UserConfirmed: false,
        },
        user: {
            newUser,
        },
      };
    } catch (error) {
      TE(error);
    }
  };

  return this;
})();