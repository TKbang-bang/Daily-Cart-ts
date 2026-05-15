import axios from "axios";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./token.service";

export const signupService = async (firstname, lastname, email, password) => {
  try {
    const response = await axios.post("/auth/signup", {
      firstname,
      lastname,
      email,
      password,
    });

    if (response.status !== 201)
      return {
        success: false,
        message: response.data?.error?.message,
      };

    const accessToken = response.data.data.accessToken.split(" ")[1];
    setAccessToken(accessToken);

    return { success: true, message: response.data?.data?.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error?.message || "Something went wrong",
    };
  }
};

export const signinService = async (email, password) => {
  try {
    const response = await axios.post("/auth/signin", {
      email,
      password,
    });
    if (response.status !== 201)
      return {
        success: false,
        message: response.data?.error?.message,
      };

    const accessToken = response.data.data.accessToken.split(" ")[1];
    setAccessToken(accessToken);

    return { success: true, message: response.data?.data?.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error?.message || "Something went wrong",
    };
  }
};

export const isUserLogged = async () => {
  try {
    const response = await axios.get("/protected/api", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (response.status !== 201)
      return { success: false, message: response.data?.error?.message };

    setAccessToken(response.headers["access-token"].split(" ")[1]);

    return {
      success: true,
      message: response.data?.data?.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error?.message || "Something went wrong",
    };
  }
};

export const logoutService = async () => {
  try {
    const response = await axios.delete("/auth/logout", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (response.status !== 201)
      return { success: false, message: response.data?.error?.message };

    setAccessToken(null);
    removeAccessToken();

    return { success: true, message: "Logout successful" };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error?.message || "Something went wrong",
    };
  }
};
