import axios from "axios";

const placeholderApiAxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default class AxiosService {
  /**
   * Get axios instance for Json Placeholder API.
   */
  public static placeholderApiInstance = placeholderApiAxiosInstance;
}
