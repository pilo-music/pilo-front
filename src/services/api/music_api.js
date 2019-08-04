import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function single(slug) {
  let url = `/music/${slug}`;
  if (user) {
    url = `/music/user/${slug}?token=${user.access_token}`;
  }
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

export function get(type, page, artist) {
  var url = "";
  if (type != "" && type != null) type = "/" + type;
  else type = "";

  if (artist) url = `/musics/artist/${artist}/${page}${type}`;
  else url = `/musics${type}/${page}`;

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
