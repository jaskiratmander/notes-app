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

const setLocalUser = (user) => {
  const userJSON = JSON.stringify(user);
  localStorage.setItem("current-user", userJSON);
};

const authRequest = async ({ payload, type }) => {
  const url = `https://grumpy-boot-bull.cyclic.app/${type}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const {
    mutate: loginMutate,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
  } = useMutation(authRequest, {
    onSuccess: async (res) => {
      setUserId(res._id);
      setUsername(res.username);
      setLocalUser({ id: res._id, username: res.username });
    },
  });

  const {
    mutate: signupMutate,
    error: signupError,
    isLoading: signupIsLoading,
    isSuccess: signupIsSuccess,
  } = useMutation(authRequest, {
    onSuccess: async (res) => {
      setUserId(res.result.insertedId);
      setUsername(res.username);
      setLocalUser({ id: res.result.insertedId, username: res.username });
    },
  });

  const loginUser = async (email, password) => {
    try {
      loginMutate({ payload: { email, password }, type: "login" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const signupUser = async (email, password, username) => {
    try {
      signupMutate({ payload: { email, password, username }, type: "signup" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("current-user");
  };

  const value = {
    userId: userId,
    username: username,
    isSuccess: loginIsSuccess || signupIsSuccess,
    error: loginError || signupError,
    isLoading: loginIsLoading || signupIsLoading,
    loginUser,
    signupUser,
    logout,
    setUserId,
    setUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
