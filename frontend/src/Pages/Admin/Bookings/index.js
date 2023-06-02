import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import Heading from "../../../SharedComponents/Admin/Heading";
import { makeGetAPICall, makePatchAPICall } from "../../../Utils/api";

import "./Bookings.css";

const Bookings = () => {
  const [bookingType, setBookingType] = useState("upcoming");
  const [upcoming, setUpcomingBookings] = useState([]);
  const [cancelled, setCancelledBookings] = useState([]);
  const [completed, setCompletedBookings] = useState([]);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "email",
      headerName: "Holder",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "movieName",
      headerName: "Movie Name",
      flex: 1,
    },
    {
      field: "theater",
      headerName: "Theater",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "DateOfShow",
      headerName: "Date of Show",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "booking time",
      flex: 1,
    },
    bookingType === "upcoming" && {
      field: "id",
      headerName: "Mark As Completed",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              markCompleted(params.row.id);
            }}
            className="new-bus-btn"
          >
            MARK AS COMPLETED
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data1 = await makeGetAPICall(`/api/admin/bookings/upcoming`, {
      Authorization: `Bearer ${token}`,
    });

    console.log("data1.bookings");
    console.log(data1.bookings);

    setUpcomingBookings(data1.bookings);
    setRows(
      data1.bookings.map((booking) => {
        return {
          email: booking.userId.email,
          phone: booking.userId.phoneNumber,
          movieName: booking.movieId.name,
          theater: booking.movieId.theater,
          city: booking.movieId.city,
          DateOfShow: booking.movieId.dateOfShow,
          createdAt: booking.createdAt,
          id: booking._id,
        };
      })
    );

    const data2 = await makeGetAPICall(`/api/admin/bookings/cancelled`, {
      Authorization: `Bearer ${token}`,
    });

    console.log("data2.bookings");
    console.log(data2.bookings);

    setCancelledBookings(data2.bookings);
    const data3 = await makeGetAPICall(`/api/admin/bookings/completed`, {
      Authorization: `Bearer ${token}`,
    });

    console.log("data3.bookings");
    console.log(data3.bookings);

    setCompletedBookings(data3.bookings);
  };

  const markCompleted = async (bookingId) => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makePatchAPICall(
      `/api/admin/bookings/complete/${bookingId}`,
      { Authorization: `Bearer ${token}` }
    );

    toast.success(data.message);
    getBookings();
  };

  return (
    <div className="admin-bookings-parent">
      <Heading content={"Here's a list of all the bookings received"} />
      <Row>
        <Col xl={2} lg={2} md={2} sm={6} xs={6}>
          <button
            onClick={() => {
              setBookingType("upcoming");
              setRows(
                upcoming.map((booking) => {
                  return {
                    email: booking.userId.email,
                    phone: booking.userId.phoneNumber,
                    movieName: booking.movieId.name,
                    theater: booking.movieId.theater,
                    city: booking.movieId.city,
                    DateOfShow: booking.movieId.dateOfShow,
                    createdAt: booking.createdAt,
                    id: booking._id,
                  };
                })
              );
            }}
            className="new-bus-btn"
          >
            Upcoming
          </button>
        </Col>
        <Col xl={2} lg={2} md={2} sm={6} xs={6}>
          <button
            onClick={() => {
              setBookingType("cancelled");
              setRows(
                cancelled.map((booking) => {
                  return {
                    email: booking.userId.email,
                    phone: booking.userId.phoneNumber,
                    movieName: booking.movieId.name,
                    theater: booking.movieId.theater,
                    city: booking.movieId.city,
                    DateOfShow: booking.movieId.dateOfShow,
                    createdAt: booking.createdAt,
                    id: booking._id,
                  };
                })
              );
            }}
            className="new-bus-btn"
          >
            Cancelled
          </button>
        </Col>
        <Col xl={2} lg={2} md={2} sm={6} xs={6}>
          <button
            onClick={() => {
              setBookingType("completed");
              setRows(
                completed.map((booking) => {
                  return {
                    email: booking.userId.email,
                    phone: booking.userId.phoneNumber,
                    movieName: booking.movieId.name,
                    theater: booking.movieId.theater,
                    city: booking.movieId.city,
                    DateOfShow: booking.movieId.dateOfShow,
                    createdAt: booking.createdAt,
                    id: booking._id,
                  };
                })
              );
            }}
            className="new-bus-btn"
          >
            Completed
          </button>
        </Col>
      </Row>
      <div className="data-grid-parent">
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </div>
    </div>
  );
};

export default Bookings;
