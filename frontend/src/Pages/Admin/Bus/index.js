import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

import Heading from "../../../SharedComponents/Admin/Heading";
import { makeGetAPICall, makeDeleteAPICall } from "../../../Utils/api";
import { DataGrid } from "@mui/x-data-grid";

import "./Bus.css";

const Bus = () => {
  const [buses, setBuses] = useState([]);
  const [rows, setRows] = useState([]);
  const Navigate = useNavigate();

  const columns = [
    {
      field: "name",
      headerName: "Movie name",
      flex: 1,
    },
    {
      field: "theater",
      headerName: "Theater",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "dateOfShow",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "timeOfShow",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "_id",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteBus(params.row._id);
            }}
            className="new-bus-btn"
          >
            DELETE
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);

  const getBuses = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeGetAPICall("/api/admin/bus/", {
      Authorization: `Bearer ${token}`,
    });

    setBuses(data.buses);
    setRows(
      data.buses.map((bus) => {
        return {
          name: bus.name,
          theater: bus.theater,
          price: bus.price,
          city: bus.city,
          dateOfShow: bus.dateOfShow,
          timeOfShow: bus.timeOfShow,
          _id: bus._id,
          id: bus._id,
        };
      })
    );
  };

  const deleteBus = async (busId) => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeDeleteAPICall(`/api/admin/bus/${busId}`, {
      Authorization: `Bearer ${token}`,
    });
    toast.success(data.message);
    getBuses();
  };

  return (
    <div className="admin-bus-parent">
      <Heading content={"Here's a list of all the movies added by you"} />
      <div className="add-new-bus">
        <button
          onClick={() => {
            Navigate("/admin/addbus");
          }}
          className="new-bus-btn"
        >
          Add New Movie
        </button>
      </div>
      <div className="data-grid-parent">
        {buses && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </div>
      {/* <div className="bus-list-div">
        <Row className="bus-list-header-row">
          <Col className="bus-list-header-col">S.No.</Col>
          <Col className="bus-list-header-col">Bus Name</Col>
          <Col className="bus-list-header-col">Bus Type</Col>
          <Col className="bus-list-header-col">Source City</Col>
          <Col className="bus-list-header-col">Destination City</Col>
          <Col className="bus-list-header-col">Delete Bus</Col>
        </Row>
        <div className="buses-div">
          {buses &&
            buses.map((bus, index) => {
              return (
                <Row className="bus-data-row">
                  <Col className="bus-data-col">{index + 1}</Col>
                  <Col className="bus-data-col">{bus.name}</Col>
                  <Col className="bus-data-col">{bus.busType}</Col>
                  <Col className="bus-data-col">{bus.cities[0].cityName}</Col>
                  <Col className="bus-data-col">
                    {bus.cities[bus.cities.length - 1].cityName}
                  </Col>
                  <Col className="bus-data-col">
                    <button onClick={deleteBus.bind(null, bus._id)}>
                      DELETE
                    </button>
                  </Col>
                </Row>
              );
            })}
        </div>
      </div> */}
    </div>
  );
};

export default Bus;
