"use client";

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter, usePathname } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    const initAuth = async () => {
      const userData: string | null = localStorage.getItem("userData");

      if (userData !== null) {
        const user = JSON.parse(userData);

        if (pathname === "/") {
          router.replace("/");
        } else if (!user) {
          router.push("/login");
        } else if (pathname === "/register") {
          router.push("/dashboard");
        } else {
          const token: string | null = user?.userData["refresh-token"];
          // ** disabled temporarily
          // handleRefreshToken(token);
          setUser(user);
        }
      } else {
        if (
          pathname === "/" ||
          pathname === "/home" ||
          pathname === "/about" ||
          pathname === "/features"
        ) {
          // do nothing
        } else router.push("/login");
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleCheckToken = async (token: string) => {
    const url = process.env.API_URL;
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
          toast.error("Timeout, please login again!");
          handleLogout();
        }
      } catch (error) {
        console.error(error);
        toast.error("Timeout, please login again!");
        handleLogout();
      }
    }
  };

  const handleRefreshToken = async (token: string | null) => {
    const url = process.env.API_URL;
    const refreshToken = {
      token: token,
    };

    console.log("refresh token:", refreshToken);

    try {
      const response = await axios.post(`${url}auth/token`, refreshToken, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const result = response.data;

      console.log("result", result);

      if (result.success) {
        localStorage.setItem("userData", JSON.stringify(result.data));
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
    toast.success("Logout successful!");
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
  return (
    <>
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
      <ToastContainer />
    </>
  );
};

export { AuthContext, AuthProvider };
