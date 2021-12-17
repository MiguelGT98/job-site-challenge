import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm";
import SignupForm from "../components/auth/SignupForm";
import { useAuth } from "../components/auth/useAuth";
import Layout from "../components/layout/Layout";

const AuthPage = () => {
  // This checks if the user is authenticated
  const user = useAuth();

  // This is to switch between sign in or sign up
  const [page, setPage] = useState("login");

  if (user) return <Navigate to="/"></Navigate>;

  // Serve the right page depending on what the user wants to do
  if (page === "login") {
    return (
      <Layout>
        <h1 className="font-bold text-6xl">Sign in</h1>
        <hr className="my-4 text-gray-500"></hr>
        <SigninForm></SigninForm>
        <p className="text-center mt-2 font-light text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setPage("signup")}
          >
            Sign up
          </span>
        </p>
      </Layout>
    );
  }

  if (page === "signup") {
    return (
      <Layout>
        <h1 className="font-bold text-6xl">Sign up</h1>
        <hr className="my-4 text-gray-500"></hr>
        <SignupForm></SignupForm>
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setPage("login")}
          >
            Sign in
          </span>
        </p>
      </Layout>
    );
  }
};

export default AuthPage;
