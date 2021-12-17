import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { SIGNUP } from "../../graphql/user";
import { setAuthToken } from "./useAuth";

const SignupForm = () => {
  // Use mutation from graphql api
  const [signup, { data, loading, error }] = useMutation(SIGNUP);

  // Variable and function to keep form data up to date
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const input = e.currentTarget;

    setFormData({ ...formData, [input.id]: input.value });
  };

  const onSubmit = () => {
    signup({ variables: { signupData: formData } });
  };

  if (loading) return "Submitting...";
  if (data && data.signup && data.signup.success) {
    setAuthToken(data.signup.token);

    return <Navigate to="/" />;
  }

  return (
    <form>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          required
          type="text"
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full"
          id="name"
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block uppercase text-xs font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          required
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
          required
          type="password"
          onChange={onChange}
          className="border shadow rounded-md block py-2 px-4 w-full"
          id="password"
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!formData.name || !formData.email || !formData.password}
          type="button"
          onClick={onSubmit}
          className="h-fit py-3 px-8 bg-gray-800 text-white rounded-md border-0 shadow disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Sign up
        </button>
      </div>
      <div className="text-center">
        {error ? `Submission error! ${error.message}` : ""}
        {data && data.login && !data.login.success ? data.login.message : ""}
      </div>
    </form>
  );
};

export default SignupForm;
