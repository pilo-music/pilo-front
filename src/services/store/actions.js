import http from "@/services/httpService.js";
import store from ".";
export default {
  login(context, user) {
    context.commit("LOGIN", user);
  },
  logout(context) {
    context.commit("LOGOUT");
  },
  refresh(context, token, router) {
    http
      .post("/refresh", {
        token
      })
      .then(reponse => {
        if (reponse.status == 200) {
          store.dispatch("login", reponse.data);
        } else {
          store.dispatch("logout");
        }
      })
      .catch(() => {
        store.dispatch("logout");
        router.push({
          name: "home"
        });
      });
  },
  setCurrentMusic(context, music) {
    context.commit("SET_CURRENT_MUSIC", music);
  },
  setCurrentSetting(context, setting) {
    context.commit("SET_CURRENT_SETTING", setting);
  }
};
