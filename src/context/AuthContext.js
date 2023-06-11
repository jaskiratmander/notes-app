import { createContext, useState } from "react";
import { useMutation } from "react-query";

const defaultState = {
  userId: null,
  isSuccess: null,
  error: null,
  isLoading: null,
  loginUser: () => {},
};

export const AuthContext = createContext(defaultState);

const authRequest = async ({ payload, type }) => {
  try {
    const url = `https://grumpy-boot-bull.cyclic.app/${type}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const {
    mutate: loginMutate,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
  } = useMutation(authRequest, {
    onSuccess: async (res) => {
      console.log(res);
      setUserId(res._id);
    },
  });

  const {
    mutate: signupMutate,
    error: signupError,
    isLoading: signupIsLoading,
    isSuccess: signupIsSuccess,
  } = useMutation(authRequest, {
    onSuccess: async (res) => {
      setUserId(res.insertedId);
    },
  });

  const loginUser = async (email, password) => {
    try {
      loginMutate({ payload: { email, password }, type: "login" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const signupUser = async (email, password) => {
    try {
      signupMutate({ payload: { email, password }, type: "signup" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    userId: userId,
    isSuccess: loginIsSuccess || signupIsSuccess,
    error: loginError || signupError,
    isLoading: loginIsLoading || signupIsLoading,
    loginUser,
    signupUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
