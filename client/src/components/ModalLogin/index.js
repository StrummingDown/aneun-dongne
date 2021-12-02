import React, { useState } from "react";
import axios from "axios";

import { Styled } from "./style";
import { message } from "../../message";

const ModalLogin = ({ handleResponseSuccess, ToSignupModal }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = loginInfo;

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (email === "") {
      setErrorMessage(message.loginEmail);
      return;
    } else if (password === "") {
      setErrorMessage(message.loginPassword);
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          email,
          password,
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then(() => {
        handleResponseSuccess();
      })
      .catch(() => {
        setErrorMessage(message.loginError);
      });
  };

  return (
    <>
      <Styled.FormContainer>
        <div className="form-title">아는 동네</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-email">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={email} onChange={handleInputValue("email")} />
          </div>
          <div className="form-password">
            <label htmlFor="password">password</label>
            <input id="password" type="password" value={password} onChange={handleInputValue("password")} />
          </div>
          <div className="alert-box">{errorMessage}</div>

          <button type="submit" className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <div>아직 회원이 아니신가요?</div>
          <div className="signup-link" onClick={ToSignupModal}>
            회원가입하기
          </div>
        </form>
      </Styled.FormContainer>
    </>
  );
};

export default ModalLogin;