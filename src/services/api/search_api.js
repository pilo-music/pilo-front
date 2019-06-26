import http from "./../httpService";

export function search(text) {
  return new Promise((resolve, reject) => {
    http
      .get(`/search/${text}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
