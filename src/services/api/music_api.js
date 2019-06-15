import http from "./../httpService";

export function single(slug) {
  return new Promise((resolve, reject) => {
    http
      .get(`/music/${slug}`)
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
      .get(`/musics/${page}/${type}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
