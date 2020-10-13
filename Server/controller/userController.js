const {
    createUser,
    loginUser,
  } = require("../services/user/userService");
  
  module.exports = {
    /**
     * ----------|| User Create ||------------
     */
    create: async (req, res) => {
      try {
        ReS(res, await createUser(req), 200);
      } catch (error) {
        ReE(res, error, 422, "User Controller >>> create method");
      }
    },

    loginUser: async (req, res) => {
        try {
          ReS(res, await loginUser(req), 200);
        } catch (error) {
          console.log(error)
          // next(error)
          ReE(res, error, 422, "User Controller >>> login method");
        }
      },

  };
  