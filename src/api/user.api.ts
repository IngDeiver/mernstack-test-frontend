import axios from "axios";
import { User } from "../types/User";
import { UserCredentials } from "../types/UserCredentials";

const BASER_URL = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: `${BASER_URL}/api/auth` || "",
});

const create = (user: User) => {
  return instance.post<User>("/signup", user);
};

const login = (credentials: UserCredentials) => {
  return instance.post(`/login`, credentials);
};

const logout = () => {
  return instance.post(`/logout`);
};

export { create, login, logout };
