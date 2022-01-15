import axios from "axios";

const BASER_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: `${BASER_URL}/api` || "",
});