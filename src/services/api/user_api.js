import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function me(token) {
  if (token) url = `/me?token=${token}`;
  else if (user) {
    var url = `/me?token=${user.access_token}`;
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

export function edit(name, password, phone, birth, gender) {
  return new Promise((resolve, reject) => {
    http
      .post(
        "/user/update",
        {
          name,
          password,
          phone,
          birth,
          gender
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

export function history() {}
