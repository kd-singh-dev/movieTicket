import React, { useEffect, useState } from "react";
import Header from "../../../SharedComponents/User/Header";
import Footer from "../../../SharedComponents/User/Footer";
import { useParams } from "react-router-dom";

import "./Booking.css";
import { makeGetAPICall, makePostAPICall } from "../../../Utils/api";
import { reactLocalStorage } from "reactjs-localstorage";
import { Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { movieDetails, seatNo } = useParams();
  const movie = JSON.parse(movieDetails);

  const [coupons, setCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [options, setOptions] = useState();

  const Navigate = useNavigate();

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeGetAPICall(`/api/coupons/`, {
      Authorization: `Bearer ${token}`,
    });
    setCoupons(data.coupons);
  };

  const applyCoupon = (coupon) => {
    let discountPercentage = coupon.discountPercentage;
    discountPercentage /= 100;
    setDiscount(discountPercentage * movie.price);
  };

  const bookSeat = async () => {
    console.log(movie);
    const data = await makePostAPICall(
      "/api/razorpay/",
      {},
      { amount: movie.price - discount }
    );

    const options = {
      key: "rzp_test_ySM0RqwM04njcl",
      name: "Bus Ticket Booking Application",
      description: "Thank You for travelling with us.",
      currency: "INR",
      order_id: data.orderId,
      handler: async (response) => {
        // await completeBooking(response.razorpay_payment_id);
        // console.log(response.razorpay_payment_id);
        const token = reactLocalStorage.get("busAppAuthToken");
        const data = await makePostAPICall(
          "/api/bookings/",
          { Authorization: `Bearer ${token}` },
          {
            seatNo: seatNo,
            bookingDate: movie.dateOfShow,
            amount: movie.price - discount,
            movieId: movie._id,
          }
        );
        toast.success(data.message);
        Navigate("/");
      },
      theme: {
        color: "#f1bc19",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <React.Fragment>
      <Header active={true} />
      <div className="booking-parent-div">
        <div className="booking-details-div">
          <Row className="booking-details-row">
            <Col lg={6} md={12} className="booking-details-col">
              <h3>Review Movie Details</h3>
              <Row>
                <Col>
                  <div className="bus-details">
                    <h4>{movie.name}</h4>
                    <p>{movie.theater}</p>
                  </div>
                </Col>
                <Col>
                  <div className="bus-details">
                    <h4>{movie.dateOfShow}</h4>
                    <p>Show Date</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="bus-details">
                    <h4>City {movie.city}</h4>
                  </div>
                </Col>
                <Col>
                  <div className="bus-details">
                    <h4>Time {movie.timeOfShow}</h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="bus-details">
                    <h4>{seatNo}</h4>
                    <p>Seat Number</p>
                  </div>
                </Col>
                <Col>
                  <div className="bus-details">
                    <h4>{movie.price - discount}</h4>
                    <p>Fare</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="booking-details-col">
              <h3>Confirm Booking</h3>
              <div className="booking-coupons">
                <div className="coupons-list">
                  {coupons &&
                    coupons.map((coupon) => {
                      return (
                        <Card className="booking-coupon">
                          <h4>{coupon.couponName}</h4>
                          <p>
                            Get {coupon.discountPercentage}% off. Offer ends on{" "}
                            {moment(coupon.validBefore).format("DD MMM, YYYY")}
                          </p>
                          <button
                            onClick={() => {
                              applyCoupon(coupon);
                            }}
                          >
                            APPLY COUPON
                          </button>
                        </Card>
                      );
                    })}
                </div>
              </div>
              <div className="fare-details">
                <p>
                  Base Fare: <span>Rs. {movie.price}</span>
                </p>
                <p>
                  Discount: <span>Rs. {discount}</span>
                </p>
                <p>
                  Final Amount : <span>Rs. {movie.price - discount}</span>
                </p>
              </div>
              <button onClick={bookSeat} className="confirm-booking-btn">
                CONFIRM BOOKING
              </button>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Booking;
