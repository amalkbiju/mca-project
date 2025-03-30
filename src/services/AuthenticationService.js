import ApiServices from "./ApiServices";
import { ApiConstants } from "../constants";
const login = async (username, password) => {
  try {
    console.log("api pass__", username, password);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.LOGIN,
      {
        username: username,
        password: password,
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const adminLogin = async (email, password) => {
  try {
    console.log("api pass__", email, password);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.ADMIN_LOGIN,
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

const securityLogin = async (email, password) => {
  try {
    console.log("api pass__", email, password);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.SECURITY_LOGIN,
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const labLogin = async (email, password) => {
  try {
    console.log("api pass__", email, password);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.LAB_LOGIN,
      {
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const register = async (name, email, password) => {
  try {
    // const stringWithoutFirstLetter = emailOrNumber.substring(1);
    let response = await ApiServices.HttpRequest.post(
      ApiConstants?.BACKEND_URLS?.REGSITER,
      {
        username: name,
        email: email,
        password: password,
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
const userDetails = async (token) => {
  try {
    let response = await ApiServices.HttpRequest.get(
      ApiConstants?.BACKEND_URLS?.USER_DEATILS,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};
export default {
  login,
  register,
  adminLogin,
  userDetails,
  securityLogin,
  labLogin,
};
