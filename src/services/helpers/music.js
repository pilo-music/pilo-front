export function getCurrentSong() {
  const current_song = localStorage.getItem("current_song");
  if (!current_song) {
    return null;
  }
  return JSON.parse(current_song);
}

export function getCurrentPlaylist() {
  const current_playlist = localStorage.getItem("current_playlist");
  if (!current_playlist) {
    return [];
  }
  return JSON.parse(current_playlist);
}

export function getCurrentSettings() {
  const current_settings = localStorage.getItem("current_settings");
  if (!current_settings) {
    return {
      durationSeconds: 0,
      currentSeconds: 0,
      audioPlayer: undefined,
      previousVolume: 35,
      volume: 100,
      autoPlay: false,
      progressPercentageValue: "0%",
      isLoaded: false,
      isCurrentlyPlaying: "",
      onRepeat: false,
      shuffle: false,
      shuffleOff: require("@/assets/panel/img/icon/shuffle_circle.svg"),
      shuffleOn: require("@/assets/panel/img/icon/shuffle_circle_on.svg"),
      repeat_off: require("@/assets/panel/img/icon/repeat.svg"),
      repeat_on: require("@/assets/panel/img/icon/repeat_on.svg"),
      currentIndex: 0,
      loop: {
        state: false,
        value: 1
      },
      previousPlaylistIndex: 0
    };
  }
  return JSON.parse(current_settings);
}
