"use client";

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter, usePathname } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);

  // const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Router
  const router = useRouter();
  const pathname = usePathname();

  // ** UseEffect : To Set Token, User & isLoggedIN
  useEffect(() => {
    console.log("Init Auth...");
    console.log("Env:", process.env.API_URL);
    console.log("User:", user);

    const initAuth = async () => {
      const userData: string | null = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);

        if (pathname === "/") {
          router.replace("/");
        } else if (!user) {
          router.push("/login");
        } else {
          // const token = user.token.access_token
          // handleCheckToken(token)
          setUser(user);
        }
      } else {
        router.push("/login");
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckToken = async (token: string) => {
    const url = process.env.API_URL;

    console.log("Check token...");
    console.log("Token", token, "User", user);
    if (token) {
      try {
        const response = await fetch(`${url}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          console.log("Relogin success!", result);
          setUser(result.data);

          // toast.success('Relogin success!')
          // do nothing
        } else {
          console.error(result);
          toast.error("Timeout, please login again");
          handleLogout();
        }
      } catch (error) {
        console.error(error);
        toast.error("Timeout, please login again");
        handleLogout();
      }
    }
  };

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    const url = process.env.API_URL;
    console.log("Url", url);
    console.log("Params", params);

    try {
      const response = await axios.post(`${url}auth/login`, params, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = response.data;

      console.log("result", result);

      if (result.success) {
        if (params.rememberMe) {
          localStorage.setItem("userData", JSON.stringify(result.data));
        }
        setUser(result.data);
        toast.success(result.message);

        router.push("/dashboard");
      } else {
        console.error(result);
        toast.error(result.message);
        setUser(null);
      }
    } catch (error: any) {
      console.error("Error", error);
      toast.error("Something went wrong! Please try again.");
      if (errorCallback) errorCallback(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");

    // window.localStorage.removeItem('testResult')
    router.push("/login");
  };

  const values = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
  };

  // ** Return Provider
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
