import { getLocalUser } from "./../helpers/auth";
const user = getLocalUser();
export default {
  currentUser: user,
  currentMusic: {},
  isPlaying: false
};
