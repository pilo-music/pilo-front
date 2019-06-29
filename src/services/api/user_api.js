import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function messages() {
  return new Promise((resolve, reject) => {
    http
      .post("/messages", null, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
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
            Authorization: `Bearer ${user.token}`
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
