const loadingModule = {
  state:{
    isLoading: false,
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading
    }
  },
  getters: {
    getLoading(state) {
      return state.isLoading
    }
  }
}

export {loadingModule}