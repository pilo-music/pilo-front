import Vue from "vue";
import VueSocialauth from "vue-social-auth";

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId:
        "833478452423-9ruc7h1elhd65bm59nbeh48i76llj032.apps.googleusercontent.com",
      redirectUri: "https://pilo.app/api/v1/panel/google/callback"
    }
  }
});
