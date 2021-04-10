import { AxiosInstance } from "axios";
import apiClient from ".";

class ApiService {
  service: AxiosInstance;
  constructor() {
    this.service = apiClient
    this.service.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response) {
    return response;
  }

  redirectTo(document, path) {
    document.location = path
  }

  handleError(error) {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/')
        break;
      case 404:
        this.redirectTo(document, '/404')
        break;
      default:
        this.redirectTo(document, '/500')
        break;
    }
    return Promise.reject(error)
  }

}

export default ApiService;
