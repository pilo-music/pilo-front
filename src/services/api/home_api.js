import http from "./../httpService";

export function get() {
  return new Promise((resolve, reject) => {
    http
      .get("/home/get")
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
