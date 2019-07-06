import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function get() {
  return new Promise((resolve, reject) => {
    http
      .get(`/playlists/user?token=${user.access_token}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function add(title, music_id) {
  return new Promise((resolve, reject) => {
    http
      .post(
        "/playlist/add",
        {
          title,
          music_id
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        }
      )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
