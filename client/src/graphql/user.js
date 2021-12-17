import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($signupData: SignupData) {
    signup(signupData: $signupData) {
      success
      token
      message
    }
  }
`;

const SIGNIN = gql`
  mutation Signin($loginData: LoginData) {
    login(loginData: $loginData) {
      success
      token
      message
    }
  }
`;

export { SIGNUP, SIGNIN };
