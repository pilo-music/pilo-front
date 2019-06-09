import http from "./../httpService";

export function get(context) {
  http
    .get("/home/get")
    .then(response => {
      context.isLoading = false;
      context.data = response.data.data;
    })
    .catch(err => {
      return err;
    });
}
