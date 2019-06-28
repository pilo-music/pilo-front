import VueSocialauth from "vue-social-auth";
import Vue from "vue";

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId:
        "402583778911-166t7uro9audj4tejtpd1m8p7o7td379.apps.googleusercontent.com",
      redirectUri: "api.taksound.com/api/v1/panel/google/callback"
    }
  }
});
