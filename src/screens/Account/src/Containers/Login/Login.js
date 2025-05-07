/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./Login.module.css";
import { Redirect } from "react-router-dom";

function Login({ onSuccessLogin }) {
  const {
    isAuthenticated,
    login: LoginGlobal,
    loginError,
    code,
    setLoginValues,
    isLoginIn,
  } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [disabled, setDisabled] = useState(false);

  const login = async () => {
    await LoginGlobal(username, password).then(() => {
      onSuccessLogin();
    });
  };

  const resendCode = async () => {
    await Auth.resendSignUp(username).catch((err) => {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: err?.message,
        };
      });
    });
  };

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  useEffect(() => {
    if (loginError) {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: null,
        };
      });
    }
  }, [username, password, verifyCode]);

  useEffect(() => {
    if (code === "UserNotConfirmedException") {
      resendCode();
    }
  }, [code]);

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
      })
      .catch((e) => {
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: e?.message,
          };
        });
      });
  }

  if (isAuthenticated) {
    return <Navigate to={"/player"} state={{ fromLogin: true }} />;
  }

  if (code === "UserNotConfirmedException") {
    return (
      <div className={classes.container}>
        <Input
          style={{
            marginBottom: 24,
          }}
          placeHolder="Verify"
          value={verifyCode}
          onChange={setVerifyCode}
        />

        <Button
          disabled={disabled}
          style={{ margin: "auto" }}
          onPress={verifyEmailValidationCode}
          title={"Verify"}
        />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Input
        style={{
          marginBottom: 24,
        }}
        placeHolder="Email"
        value={username}
        onChange={setUserName}
        inputType="email"
      />
      <Input
        style={{
          marginBottom: 48,
        }}
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
      />
      <Button
        disabled={disabled}
        style={{ margin: "auto" }}
        onPress={login}
        loading={isLoginIn}
        title={"Login"}
      />
      <Link className={classes.forgotPasswordText} to="/forgotPassword">
        <span>Forgot your password?</span>
      </Link>
    </div>
  );
}

export default Login;
