import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  makeGetAPICall,
  makeDeleteAPICall,
  makePostAPICall,
} from "../../../Utils/api";
import { DataGrid } from "@mui/x-data-grid";
import Heading from "../../../SharedComponents/Admin/Heading";
import Modal from "react-bootstrap/Modal";

import "./Coupons.css";
import moment from "moment";
import TextInput from "../../../SharedComponents/Form/TextInput";

function AddCouponModal(props) {
  const [couponData, setCouponData] = useState({
    couponName: "",
    discountPercentage: 0,
    validBefore: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCouponData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add A New Coupon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextInput
          label="Coupon Name"
          type="text"
          name="couponName"
          value={couponData.couponName}
          onChange={handleChange}
        />
        <TextInput
          label="Discount Percentage"
          type="number"
          name="discountPercentage"
          value={couponData.discountPercentage}
          onChange={handleChange}
        />
        <TextInput
          label="Valid Before"
          type="datetime-local"
          name="validBefore"
          value={couponData.validBefore}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide} className="new-bus-btn cancel-btn">
          CANCEL
        </button>
        <button
          onClick={() => {
            setCouponData({
              couponName: "",
              discountPercentage: 0,
              validBefore: "",
            });
            props.addCoupon(couponData);
            props.onHide();
          }}
          className="new-bus-btn"
        >
          ADD COUPON
        </button>
      </Modal.Footer>
    </Modal>
  );
}

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      field: "couponName",
      headerName: "Coupon Name",
      flex: 1,
    },
    {
      field: "discountPercentage",
      headerName: "Discount Percentage",
      flex: 1,
    },
    {
      field: "validBefore",
      headerName: "Valid Before",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Delete Coupon",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteCoupon(params.row.id);
            }}
            className="new-bus-btn"
          >
            DELETE COUPON
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeGetAPICall("/api/admin/coupons/", {
      Authorization: `Bearer ${token}`,
    });

    setCoupons(data.coupons);
    setRows(
      data.coupons.map((coupon) => {
        return {
          ...coupon,
          id: coupon._id,
          validBefore: moment(coupon.validBefore).format("DD MMM, YYYY"),
        };
      })
    );
  };

  const deleteCoupon = async (couponId) => {
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makeDeleteAPICall(`/api/admin/coupons/${couponId}`, {
      Authorization: `Bearer ${token}`,
    });

    toast.success(data.message);

    getCoupons();
  };

  const addCoupon = async (couponData) => {
    console.log(couponData);
    const token = reactLocalStorage.get("busAppAuthToken");
    const data = await makePostAPICall(
      "/api/admin/coupons",
      { Authorization: `Bearer ${token}` },
      couponData
    );

    toast.success(data.message);
    getCoupons();
  };

  return (
    <div className="admin-coupons-parent">
      <AddCouponModal
        show={showModal}
        onHide={() => setShowModal(false)}
        addCoupon={addCoupon}
      />
      <Heading content="Here's a list of all the coupons added by you" />
      <div className="add-new-coupon">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="new-bus-btn"
        >
          Add New Coupon
        </button>
      </div>
      <div className="data-grid-parent">
        {coupons && (
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

export default Coupons;
