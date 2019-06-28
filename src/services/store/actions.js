export default {
  login(context, user) {
    context.commit("LOGIN", user);
  },
  setCurrentMusic(context, music) {
    context.commit("SET_CURRENT_MUSIC", music);
  }
};
