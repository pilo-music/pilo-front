import axios from "axios";

class httpService {
  static get(url) {
    return axios.get("https://pilo.app/api/v1/panel" + url);
  }

  static post(url, params, config) {
    if (!config) {
      return axios.post("https://pilo.app/api/v1/panel" + url, params);
    }
    return axios.post("https://pilo.app/api/v1/panel" + url, params, config);
  }
}

export default httpService;
