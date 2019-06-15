import http from "./../httpService";

export function single(slug) {
  return new Promise((resolve, reject) => {
    http
      .get(`/video/${slug}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function get(type, page) {
  return new Promise((resolve, reject) => {
    http
      .get(`/videos/${page}/${type}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
