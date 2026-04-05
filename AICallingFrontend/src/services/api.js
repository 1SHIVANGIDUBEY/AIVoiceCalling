import axios from "axios";

export const leadAPI = axios.create({
  baseURL: "http://localhost:8081/api/leads",
});

export const campaignAPI = axios.create({
  baseURL: "http://localhost:8082/api/campaigns",
});