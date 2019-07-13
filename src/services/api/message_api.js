import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function send(subject, text, type) {
  return new Promise((resolve, reject) => {
    http
      .post(
        `/message/add`,
        {
          subject,
          text,
          type
        },
        {
          headers: { Authorization: "bearer " + user.access_token }
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

export function get() {
  return new Promise((resolve, reject) => {
    http
      .get(`/messages?token=${user.access_token}`)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
