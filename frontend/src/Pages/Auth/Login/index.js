import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitButton from "../../../SharedComponents/Form/SubmitButton";
import TextInput from "../../../SharedComponents/Form/TextInput";
import { makePostAPICall } from "../../../Utils/api";
import { reactLocalStorage } from "reactjs-localstorage";

import "./Login.css";
import { AuthContext } from "../../../Contexts";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { getLoginStatus } = useContext(AuthContext);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    const data = await makePostAPICall("/api/auth/login", {}, userData);

    reactLocalStorage.set("busAppAuthToken", data.token);
    getLoginStatus();

    toast.success(data.message);
  };
  return (
    <div className="sign-up-parent-div">
      <Row className="login-row">
        <Col className="login-form-col" xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="form-div">
            <h4>Sign In!</h4>
            <TextInput
              label="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <SubmitButton onSubmit={signInHandler} btnText="Sign In" />
            <p>
              New Here? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </div>
        </Col>
        <Col className="login-image-col" xl={6} lg={6} md={6}>
          <h1>Become a part of smooth ticketing experience!</h1>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
