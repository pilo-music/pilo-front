import { getLocalUser } from "./../helpers/auth";
const user = getLocalUser();
export default {
  currentUser: user,
  currentSong: {},
  isPlaying: false,
  currentIndex: 0
};
