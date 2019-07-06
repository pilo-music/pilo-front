export default {
  LOGIN(state, user) {
    state.currentUser = user;
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  },
  LOGOUT(state) {
    state.currentUser = null;
    localStorage.removeItem("user");
  },
  SET_CURRENT_MUSIC(state, music) {
    state.currentMusic = music;
  },
  SET_IS_PLAYING(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  SET_CURRENT_INDEX(state, index) {
    state.currentIndex = index;
  }
};
