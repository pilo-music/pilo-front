import http from "./../httpService";
import store from "./../store/index";
let user = store.getters.currentUser;

export function login(email, password) {
  return new Promise((resolve, reject) => {
    http
      .post("/login", {
        email,
        password
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    http
      .post("/logout", null, {
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

export function refresh() {
  return new Promise((resolve, reject) => {
    http
      .post("/refresh")
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function me() {
  return new Promise((resolve, reject) => {
    http
      .post("/me", null, {
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
