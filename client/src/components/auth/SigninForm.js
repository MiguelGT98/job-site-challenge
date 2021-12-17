import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { SIGNIN } from "../../graphql/user";
import { setAuthToken } from "./useAuth";

const SigninForm = () => {
  // Use mutation from graphql api
  const [signin, { data, loading, error }] = useMutation(SIGNIN);

  // Variable and function to keep form data up to date
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChange = (e) => {
    const input = e.currentTarget;

    setFormData({ ...formData, [input.id]: input.value });
  };

  const onSubmit = () => {
    signin({ variables: { loginData: formData } });
  };

  if (loading) return "Submitting...";
  if (data && data.login && data.login.success) {
    setAuthToken(data.login.token);

    return <Navigate to="/" />;
  }

  return (
    <form>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full"
          id="email"
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full"
          id="password"
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!formData.email || !formData.password}
          type="button"
          onClick={onSubmit}
          className="h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Sign in
        </button>
      </div>
      <div className="text-center text-red-500">
        {error ? `Submission error! ${error.message}` : ""}
        {data && data.login && !data.login.success ? data.login.message : ""}
      </div>
    </form>
  );
};

export default SigninForm;
