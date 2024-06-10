export const funSetContact = (data) => {
  try {
    return {
      type: "SETCONTACT",
      payload: data,
    };
  } catch (err) {
    console.log(err);
  }
};

export const funSetDevice = (data) => {
  try {
    return {
      type: "SETDEVICE",
      payload: data,
    };
  } catch (err) {
    console.log(err);
  }
};

export const setUserDetails = (data) => {
  try {
    return {
      type: "SETUSER",
      payload: data,
    };
  } catch (err) {
    console.log(err);
  }
};

// export const setUserDetails = (data) => {
//   try {
//     return {
//       type: "GETUSER",
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };
