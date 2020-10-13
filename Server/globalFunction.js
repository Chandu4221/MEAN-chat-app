//generates a unique username for user.
generateUsername = function (name) {
  return name + '_' + Math.random().toString(36).substr(2, 9);
};


TE = function (err, log) {
  // TE stands for Throw Error, showing error in development mode only
  let _err;
  switch (true) {
    case typeof err.code === "number" && err.code === 11000:
      _err = "Record already exist.";
      break;
    default:
      _err = err;
      break;
  }
  if (process.env.NODE_ENV === "development") {
    console.error(log);
  }

  throw new Error(_err);
};

ReE = function (res, err, code, log) {
  // Error Web Response
  //showing log in development mode only
  if (process.env.NODE_ENV === "development") {
    console.error(`Error logged from API :${log}`);
  }
  let send_data = { success: false };
  if (typeof code !== "undefined") res.statusCode = code;

  if (err instanceof Error && typeof err.message != "undefined") {
    err = err.message;
  } else {
    send_data = { ...send_data, ...err }; //merge the objects
    return res.json(send_data);
  }

  return res.json({ success: false, message: err });
};

ReS = function (res, data, code) {
  // Success Web Response
  let send_data = { success: true };
  if (typeof data === "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);
};


