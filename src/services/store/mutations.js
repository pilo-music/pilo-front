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
    if (musics.length > 20) {
      musics.split(musics.length - 1, 1);
    }
    state.currentPlaylist = musics;
    localStorage.setItem(
      "current_playlist",
      JSON.stringify(state.currentPlaylist)
    );
  },
  SET_IS_PLAYING(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  SET_CURRENT_SETTING(state, setting) {
    state.currentSettings = setting;
    localStorage.setItem(
      "current_settings",
      JSON.stringify(state.currentSettings)
    );
  }
};
