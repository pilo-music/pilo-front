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
    localStorage.setItem("current_song", JSON.stringify(state.currentMusic));
  },
  SET_CURRENT_PLAYLIST(state, musics) {
    state.currentPlaylist = musics;
    localStorage.setItem(
      "current_playlist",
      JSON.stringify(state.currentPlaylist)
    );
  },
  SET_IS_PLAYING(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  SET_CURRENT_SETTING(state, name, setting) {
    state.currentSettings.name = setting;
  }
};
