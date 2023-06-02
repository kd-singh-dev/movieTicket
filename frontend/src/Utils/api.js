import axios from "axios";
import { toast } from "react-toastify";

export const makePostAPICall = async (url, headers, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(`ERROR : ${error.response.data.error}`);
  }
};

export const makeGetAPICall = async (url, headers) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(`ERROR : ${error.response.data.error}`);
  }
};

export const makePatchAPICall = async (url, headers, data) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: url,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(`ERROR : ${error.response.data.error}`);
  }
};

export const makeDeleteAPICall = async (url, headers, data) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: url,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(`ERROR : ${error.response.data.error}`);
  }
};
