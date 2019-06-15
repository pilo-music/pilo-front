import http from "./../httpService";

export function get(slug) {
  return new Promise((resolve, reject) => {
    http
      .get(`/album/${slug}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
