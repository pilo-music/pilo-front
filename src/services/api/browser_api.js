import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function get() {
  return new Promise((resolve, reject) => {
    let url = `/browser/get`;
    if (user) {
      url = `/browser/user/get?token=${user.access_token}`;
    }
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
