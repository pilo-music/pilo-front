import { getLocalUser } from "./../helpers/auth";
import {
  getLocalSong,
  getLocalPlaylist,
  getLocalSettings
} from "./../helpers/music";
const user = getLocalUser();
const music = getLocalSong();
const playlist = getLocalPlaylist();
const settings = getLocalSettings();
export default {
  currentUser: user,
  currentSong: music,
  isPlaying: false,
  currentPlaylist: playlist,
  currentSettings: settings
};
