import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import Heading from "../../../SharedComponents/Admin/Heading";
import TextInput from "../../../SharedComponents/Form/TextInput";
import { makePostAPICall } from "../../../Utils/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./AddBus.css";

const AddBus = () => {
  const Navigate = useNavigate();
  const [file, setFile] = useState();

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setData((prev) => {
      return { ...prev, ["image"]: file };
    });
  };

  const [data, setData] = useState({
    name: "",
    theater: "",
    price: 0,
    city: "",
    seats: 0,
    dateOfShow: Date.now(),
    timeOfShow: Date.now(),
    image: null,
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCityChange = (event, index) => {
    event.preventDefault();
    const cities = data.cities;
    cities[index] = event.target.name;
    setData((prev) => {
      return { ...prev, cities };
    });
  };

  const addBus = async (event) => {
    event.preventDefault();

    var form_data = new FormData();
    for (var key in data) {
      if (key == "dateOfShow") {
        form_data.append(key, moment(data[key]).format("DD MMM, YYYY"));
      } else {
        form_data.append(key, data[key]);
      }
    }

    const token = reactLocalStorage.get("busAppAuthToken");

    const response = await makePostAPICall(
      "/api/admin/bus/",
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      form_data
    );

    toast.success(response.message);
    Navigate("/admin/bus");
  };

  return (
    <div className="add-bus-parent-div">
      <Heading content="Add a new movie by entering the following information" />

      <TextInput
        label="Movie Name"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
      />

      <TextInput
        label="Theater"
        type="text"
        name="theater"
        value={data.theater}
        onChange={handleChange}
      />
      <TextInput
        label="Number Of Seats"
        type="number"
        name="seats"
        value={data.seats}
        onChange={handleChange}
      />

      <TextInput
        label="price"
        type="number"
        name="price"
        value={data.price}
        onChange={handleChange}
      />

      <TextInput
        label="Date Of Show"
        type="datetime-local"
        name="dateOfShow"
        value={data.dateOfShow}
        onChange={handleChange}
      />

      <TextInput
        label="Time Of Show"
        type="time"
        name="timeOfShow"
        value={data.timeOfShow}
        onChange={handleChange}
      />

      <TextInput
        label="City"
        type="text"
        name="city"
        value={data.city}
        onChange={handleChange}
      />

      <input
        onChange={fileSelected}
        type="file"
        accept="image/*"
        style={{ marginBottom: "10px" }}
      />

      <button
        onClick={addBus}
        style={{ width: "100%" }}
        className="new-bus-btn"
      >
        Add new Movie
      </button>
    </div>
  );
};

export default AddBus;
