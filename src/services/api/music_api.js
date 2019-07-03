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

export function get(type, page, artist) {
  var url = "";
  if (artist) url = `/musics/${artist}/${type}/${page}`;
  else url = `/musics/${type}/${page}`;

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
