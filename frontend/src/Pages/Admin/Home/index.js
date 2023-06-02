import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { makeGetAPICall } from "../../../Utils/api";
import Heading from "../../../SharedComponents/Admin/Heading";
import users from "../../../Assets/users.png";
import bus from "../../../Assets/bus.png";
import coupon from "../../../Assets/coupon.png";
import cancelled from "../../../Assets/cancelled.png";
import completed from "../../../Assets/completed.png";
import upcoming from "../../../Assets/upcoming.png";

import "./Home.css";
import StatsCard from "../../../SharedComponents/Admin/StatsCard";

const Home = () => {
  const [stats, setStats] = useState({
    bus: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    upcomingBookings: 0,
    coupons: 0,
    users: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeGetAPICall("/api/admin/stats/", {
      Authorization: `Bearer ${token}`,
    });

    setStats(data.stats);
  };

  return (
    // <div className="admin-home-parent">
    // <Heading content={"Here are some quick stats for you"} />
    <Row>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image={users}
          label="Users"
          heading={stats.users}
          paragraph="users have registered on your app so far"
        />
      </Col>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image="https://i.imgur.com/Ugpvp8N.png"
          label="Bus"
          heading={stats.bus}
          paragraph="movies have been added to your app so far"
        />
      </Col>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image={coupon}
          label="Coupons"
          heading={stats.coupons}
          paragraph="coupons have been issued on your app so far"
        />
      </Col>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image={completed}
          label="Completed"
          heading={stats.completedBookings}
          paragraph="bookings have been completed on your app so far"
        />
      </Col>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image={upcoming}
          label="Upcoming"
          heading={stats.upcomingBookings}
          paragraph="bookings are yet to begin"
        />
      </Col>
      <Col xl={4} lg={4} md={6} sm={12}>
        <StatsCard
          image={cancelled}
          label="Cancelled"
          heading={stats.cancelledBookings}
          paragraph="bookings could not make it to the end"
        />
      </Col>
    </Row>
    // </div>
  );
};

export default Home;
