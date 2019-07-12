import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function single(slug) {
  let url = `/video/${slug}`;
  if (user) {
    url = `/video/user/${slug}?token=${user.access_token}`;
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

  if (artist) url = `/videos/artist/${artist}/${page}`;
  else url = `/videos${type}/${page}`;
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
