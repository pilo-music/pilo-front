import { getLocalUser } from "./../helpers/auth";
import {
  getCurrentSong,
  getCurrentPlaylist,
  getCurrentSettings
} from "./../helpers/music";
const user = getLocalUser();
const music = getCurrentSong();
const playlist = getCurrentPlaylist();
const settings = getCurrentSettings();
export default {
  currentUser: user,
  currentSong: music,
  isPlaying: false,
  currentPlaylist: playlist,
  currentSettings: settings
  // currentSettings: {
  //   durationSeconds: 0,
  //   currentSeconds: 0,
  //   audioPlayer: undefined,
  //   previousVolume: 35,
  //   volume: 100,
  //   autoPlay: false,
  //   progressPercentageValue: "0%",
  //   isLoaded: false,
  //   isCurrentlyPlaying: "",
  //   onRepeat: false,
  //   shuffle: false,
  //   shuffleOff: require("@/assets/panel/img/icon/shuffle_circle.svg"),
  //   shuffleOn: require("@/assets/panel/img/icon/shuffle_circle_on.svg"),
  //   repeat_off: require("@/assets/panel/img/icon/repeat.svg"),
  //   repeat_on: require("@/assets/panel/img/icon/repeat_on.svg"),
  //   currentIndex: 0,
  //   loop: {
  //     state: false,
  //     value: 1
  //   },
  //   previousPlaylistIndex: 0
  // }
};
