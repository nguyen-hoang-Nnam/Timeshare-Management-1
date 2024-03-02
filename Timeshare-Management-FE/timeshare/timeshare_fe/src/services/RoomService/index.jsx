import http from "../index";
import {
  apiGetAllRoom,
  apiGetRoomById,
  apiCreateRoom,
  apiUpdateRoom,
  apiDeleteRoom,
} from "./urls";

const getAllRoom = () => http.get(apiGetAllRoom);
const getRoomById = (id) => http.get(`${apiGetRoomById}/${id}`);
const createRoom = (body) => http.post(apiCreateRoom, body);
const updateRoom = (body) => http.put(`${apiUpdateRoom}/${body.id}`, body);
const deleteRoom = (id) => http.delete(`${apiDeleteRoom}/${id}`);

const RoomService = {
  getAllRoom,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
export default RoomService;
