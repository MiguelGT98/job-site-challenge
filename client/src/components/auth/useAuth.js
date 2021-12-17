import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { singletonHook } from "react-singleton-hook";

const initial = null;

let globalSetUser;

// Curtom hook to consume auth from localstorage
const useAuthImpl = (initialState) => {
  const [user, setUser] = useState(initialState);
  globalSetUser = setUser;

  useEffect(() => {
    const token = window.localStorage.getItem("auth");

    if (!token) {
      setUser(null);
    } else {
      setUser({ ...decodeToken(token), token });
    }
  }, []);

  return user;
};

export const useAuth = singletonHook(initial, useAuthImpl);

export const setAuthToken = (token) => {
  window.localStorage.setItem("auth", token);
  globalSetUser({ ...decodeToken(token), token });
};

export const signOut = () => {
  window.localStorage.removeItem("auth");
  globalSetUser(null);
};
