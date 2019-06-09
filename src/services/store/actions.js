export default {
  isLoading(context, status) {
    context.commit("IS_LOADING", status);
  },
}