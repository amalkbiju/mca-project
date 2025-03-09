import axios from "axios";
import { ApiConstants } from "../constants";
const HttpRequest = axios.create({
  baseURL: ApiConstants.BACKEND_BASE_URL,
});
export default { HttpRequest };
