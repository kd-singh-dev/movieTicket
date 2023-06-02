import React, { useState } from "react";
import "./Home.css";
import Header from "../../../SharedComponents/User/Header";
import { Card, Col, Row } from "react-bootstrap";
import benefits from "../../../Assets/benefits.png";
import lowestfare from "../../../Assets/lowest_Fare.png";
import customercare from "../../../Assets/customer_care.png";
import Footer from "../../../SharedComponents/User/Footer";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const [query, setQuery] = useState({ name: "", city: "", date: "" });
  const Navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setQuery((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <Header />
      <div className="user-home-parent">
        <div className="home-landing-image">
          <h1>Book your movies with comfort and ease</h1>
        </div>
        <div className="home-bus-query-div">
          <input
            placeholder="Movie name"
            name="name"
            value={query.name}
            onChange={handleChange}
          />
          <input
            placeholder="City"
            name="city"
            value={query.city}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="DATE"
            value={query.date}
            name="date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (query.date !== "") e.target.type = "date";
              else e.target.type = "text";
            }}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              Navigate(
                `/buses/${query.name}/${query.city}/${moment(query.date).format(
                  "DD MMM, YYYY"
                )}`
              );
            }}
          >
            SEARCH MOVIES
          </button>
        </div>
        <div className="dummy-div"></div>
        <div className="why-us-div">
          <h2>WHY US?</h2>
          <p>Here is why we are the best choice for you</p>
          <Row className="why-us-row">
            <Col className="why-us-col" xl={4} lg={4} md={12} sm={12} xs={12}>
              <Card className="why-us-card">
                <img src={benefits} alt="benefits" />
                <h6>UNMATCHED BENEFITS</h6>
                <p>
                  We take care of your travel beyond ticketing by providing you
                  with innovative and unique benefits.
                </p>
              </Card>
            </Col>
            <Col className="why-us-col" xl={4} lg={4} md={12} sm={12} xs={12}>
              <Card className="why-us-card">
                <img src={customercare} alt="benefits" />
                <h6>SUPERIOR CUSTOMER SERVICE</h6>
                <p>
                  We put our experience and relationships to good use and are
                  available to solve your travel issues.
                </p>
              </Card>
            </Col>
            <Col className="why-us-col" xl={4} lg={4} md={12} sm={12} xs={12}>
              <Card className="why-us-card">
                <img src={lowestfare} alt="benefits" />
                <h6>LOWEST PRICES</h6>
                <p>
                  We always give you the lowest price with the best partner
                  offers.
                </p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="stats-div">
          <h2>THE NUMBERS ARE GROWING!</h2>
          <Row className="stats-row">
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="stats-col">
              <Card className="stats-card">
                <p>CUSTOMERS</p>
                <h2>36 M</h2>
                <p>
                  our website is trusted by over 36 million happy customers
                  globally
                </p>
              </Card>
            </Col>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="stats-col">
              <Card className="stats-card">
                <p>OPERATORS</p>
                <h2>3500</h2>
                <p>network of over 3500 bus operators worldwide</p>
              </Card>
            </Col>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="stats-col">
              <Card className="stats-card">
                <p>BUS TICKETS</p>
                <h2>220+ M</h2>
                <p>over 220 million trips booked using redBus</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
