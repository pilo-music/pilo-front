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

export function register(email, password) {
  return new Promise((resolve, reject) => {
    http
      .post("/register", {
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
          Authorization: `Bearer ${user.access_token}`
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
      .post("/refresh", null, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
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

export function me() {
  return new Promise((resolve, reject) => {
    http
      .post("/me", null, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
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

export function createPasswordRequest(email) {
  return new Promise((resolve, reject) => {
    http
      .post("/password/create", {
        email: email
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function editPassword(token, email, password) {
  return new Promise((resolve, reject) => {
    http
      .post("/password/reset", {
        email: email,
        token: token,
        password: password
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
