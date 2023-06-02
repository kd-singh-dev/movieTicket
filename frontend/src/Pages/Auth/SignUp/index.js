import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import TextInput from "../../../SharedComponents/Form/TextInput";
import SubmitButton from "../../../SharedComponents/Form/SubmitButton";
import { Link, redirect } from "react-router-dom";

import "./SignUp.css";
import { makePostAPICall } from "../../../Utils/api";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const data = await makePostAPICall("/api/auth/signup", {}, userData);

    reactLocalStorage.set("busAppAuthToken", data.token);

    toast.success(data.message);
  };

  return (
    <div className="sign-up-parent-div">
      <Row className="signup-row">
        <Col className="signup-image-col" xl={6} lg={6} md={4}>
          <h1>Become a part of smooth ticketing experience!</h1>
        </Col>
        <Col className="signup-form-col" xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="form-div">
            <h4>Sign Up!</h4>
            <TextInput
              label="Name"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <TextInput
              label="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            <SubmitButton onSubmit={signUpHandler} btnText="Sign Up" />
            <p>
              Already have an accoount? <Link to={"/login"}>Sign In</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
