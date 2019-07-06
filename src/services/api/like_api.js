import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function like(action, post_id, post_type) {
  return new Promise((resolve, reject) => {
    http
      .post(
        `/like/add`,
        {
          action,
          likeable_id: post_id,
          likeable_type: post_type
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

export function list() {}
