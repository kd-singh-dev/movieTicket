import React, { useEffect, useState } from "react";
import "./Buses.css";
import Header from "../../../SharedComponents/User/Header";
import { useParams, useNavigate } from "react-router-dom";
import { MdEventSeat } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import Footer from "../../../SharedComponents/User/Footer";
import { Card, Col, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { makeGetAPICall, makePostAPICall } from "../../../Utils/api";
import moment from "moment";
import { toast } from "react-toastify";

const Buses = () => {
  const [query, setQuery] = useState(useParams());
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedSeat, setSelectedSeat] = useState();
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    getBuses();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setQuery((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getBuses = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeGetAPICall(
      `/api/bus/${query.name}/${query.city}/${moment(query.date).format(
        "DD MMM, YYYY"
      )}`,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    setMovies(data.movies);
    console.log(data);
  };

  return (
    <>
      <Header active={true} />
      <div className="buses-parent-div">
        <div className="query-info-div">
          <p>
            <span>{query.name} </span>
            <span>{<BsArrowRight className="query-icon" />}&nbsp;</span>
            <span>{query.city} </span>
            <span>{<AiOutlineCalendar className="query-icon" />} &nbsp;</span>
            <span>{query.date}</span>
          </p>
        </div>
        <Row className="bus-content-row">
          <Col
            className="bus-content-col"
            xl={3}
            lg={3}
            md={12}
            sm={12}
            xs={12}
          >
            <h4>Your Search</h4>
            <input
              placeholder="Name"
              name="name"
              value={query.name}
              onChange={handleChange}
            />
            <input
              placeholder="city"
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
                e.target.type = "text";
              }}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                getBuses();
              }}
            >
              MODIFY SEARCH
            </button>
          </Col>
          <Col
            className="bus-content-col"
            xl={9}
            lg={9}
            md={12}
            sm={12}
            xs={12}
          >
            <h4>Search Results</h4>
            {movies &&
              movies.map((movie) => {
                return (
                  <Card className="bus-info-card">
                    <div className="basic-info-div">
                      <Row className="bus-info-row">
                        <Col className="bus-info-col">
                          <img
                            // src= "/images/"+ {movie.imageKey}
                            src={`/images/${movie.imageKey}`}
                            alt=""
                            height="150px"
                            width="100px"
                          />
                        </Col>
                        <Col className="bus-info-col">
                          <h5>{movie.name}</h5>
                          <p>{movie.theater}</p>
                        </Col>
                        <Col className="bus-info-col">
                          <h5>{movie.city}</h5>
                        </Col>
                      </Row>
                      <div
                        className="additional-info-div"
                        style={{ marginTop: "20px" }}
                      >
                        <p>
                          Fare: <span>Rs. {movie.price}</span>
                        </p>
                        {!selectedMovie || selectedMovie._id !== movie._id ? (
                          <button
                            onClick={() => {
                              setSelectedMovie(movie);
                            }}
                          >
                            VIEW SEATS
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedMovie();
                              setSelectedSeat();
                            }}
                          >
                            HIDE SEATS
                          </button>
                        )}
                      </div>
                    </div>
                    {selectedMovie && selectedMovie._id === movie._id && (
                      <div className="seats-layout-div">
                        <p>
                          Seat Selected : {selectedSeat ? selectedSeat : "None"}
                        </p>
                        <p>
                          Amount :{" "}
                          {selectedSeat ? `Rs. ${movie.price}` : "Rs. 0"}
                        </p>
                        <div className="bus-layout">
                          {movie.seats.map((seat) => {
                            return (
                              <MdEventSeat
                                onClick={() => {
                                  if (selectedSeat === seat.seatNo) {
                                    setSelectedSeat();
                                  } else {
                                    setSelectedSeat(seat.seatNo);
                                  }
                                }}
                                className={`seats-icon ${
                                  seat.isBooked && "disabled"
                                } ${
                                  selectedSeat === seat.seatNo && "selected"
                                } `}
                              />
                            );
                          })}
                        </div>
                        <button
                          onClick={() => {
                            Navigate(
                              `/booking/${JSON.stringify(
                                selectedMovie
                              )}/${selectedSeat}`
                            );
                          }}
                        >
                          BOOK NOW
                        </button>
                      </div>
                    )}
                  </Card>
                );
              })}
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Buses;
