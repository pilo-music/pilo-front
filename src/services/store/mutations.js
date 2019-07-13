export default {
  LOGIN(state, user) {
    state.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  LOGOUT(state) {
    state.currentUser = null;
    state.currentSong = null;
    state.isPlaying = false;
    state.currentPlaylist = null;
    state.currentSettings = null;
    localStorage.removeItem("user");
    localStorage.removeItem("current_playlist");
    localStorage.removeItem("current_settings");
    localStorage.removeItem("current_song");
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
