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

export function get(type, page, artist) {
  var url = "";
  if (artist) url = `/videos/${artist}/${type}/${page}`;
  else url = `/videos/${type}/${page}`;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
