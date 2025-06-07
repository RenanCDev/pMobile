import axios from "axios";

export const api = axios.create({
  baseURL: "https://traininsync.onrender.com/api/v1",
});
