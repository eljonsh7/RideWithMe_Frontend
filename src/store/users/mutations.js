export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  logOut(state) {
    state.user = null;
    state.token = null;
  },
};
