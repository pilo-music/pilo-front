import http from "./../httpService";

export function like(action, post_id, post_type) {
  return new Promise((resolve, reject) => {
    http
      .post(
        `/like`,
        {
          action,
          post_id,
          post_type
        },
        {
          headers: { Authorization: "bearer " + "token" }
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
