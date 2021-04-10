import { AxiosInstance } from "axios";
import apiClient from ".";

const handleSuccess = (response) => {
  return response;
}

const redirectTo = (document, path) => {
  document.location = path
}

let document = { location: "" };

class ApiService {
  service: AxiosInstance;
  constructor() {
    this.service = apiClient
    this.service.interceptors.response.use(handleSuccess, this.handleError);
  }


  handleError(error) {
    switch (error.response.status) {
      case 401:
        redirectTo(document, '/')
        break;
      case 404:
        redirectTo(document, '/404')
        break;
      default:
        redirectTo(document, '/500')
        break;
    }
    return Promise.reject(error)
  }

}

export default ApiService;
