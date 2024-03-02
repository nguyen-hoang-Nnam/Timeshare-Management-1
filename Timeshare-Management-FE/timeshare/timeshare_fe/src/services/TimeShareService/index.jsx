import http from "../index";
import {
  apiGetAllTimeshare,
  apiGetTimeshareById,
  apiCreateTimeshare,
  apiUpdateTimeshare,
  apiDeleteTimeshare,
} from "./urls";

const getAllTimeshare = () => http.get(apiGetAllTimeshare);
const getTimeshareById = (id) => http.get(`${apiGetTimeshareById}/${id}`);
const createTimeshare = (body) => http.post(apiCreateTimeshare, body);
const updateTimeshare = (body) =>
  http.put(`${apiUpdateTimeshare}/${body.id}`, body);
const deleteTimeshare = (id) => http.delete(`${apiDeleteTimeshare}/${id}`);

const TimeShareService = {
  getAllTimeshare,
  getTimeshareById,
  createTimeshare,
  updateTimeshare,
  deleteTimeshare,
};
export default TimeShareService;
