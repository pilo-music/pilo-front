import http from "./../httpService";

export function get() {
  return new Promise((resolve, reject) => {
    http
      .get("/browser/get")
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
