import axios from "axios";

class httpService {
  static get(url) {
    return axios.get("https://api.pilo.app/api/v1/panel" + url);
  }

  static post(url, params, config) {
    if (!config) {
      return axios.post("https://api.pilo.app/api/v1/panel" + url, params);
    }
    return axios.post(
      "https://api.pilo.app/api/v1/panel" + url,
      params,
      config
    );
  }
  // static get(url) {
  //   return axios.get("http://localhost:8000/api/v1/panel" + url);
  // }

  // static post(url, params, config) {
  //   if (!config) {
  //     return axios.post("http://localhost:8000/api/v1/panel" + url, params);
  //   }
  //   return axios.post(
  //     "http://localhost:8000/api/v1/panel" + url,
  //     params,
  //     config
  //   );
  // }
}

export default httpService;
