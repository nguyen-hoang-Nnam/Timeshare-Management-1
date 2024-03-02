import http from "../index";
import {
  apiGetAllUser,
  apiGetUserById,
  apiUpdateUser,
  apiDeleteUser,
} from "./urls";

const getAllUser = () => http.get(apiGetAllUser);
const getUserById = (id) => http.get(`${apiGetUserById}/${id}`);
const updateUser = (body) => http.put(`${apiUpdateUser}/${body.id}`, body);
const deleteUser = (id) => http.delete(`${apiDeleteUser}/${id}`);

const UserService = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
export default UserService;
