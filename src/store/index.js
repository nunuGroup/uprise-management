import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editMode: false,
    globalTrans: false,
    globalMove: 'this.$refs.fullpage.api.moveTo(sec);'
  },
  mutations: {
    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },
    togglePane(state) {
      //console.clear();
      state.globalTrans = true;
      console.log('transitioning?', state.globalTrans);
      setTimeout(() => {
        state.globalTrans = false;
        //console.log('transitioning?: ' + state.globalTrans);
      }, 1000);
    },
    cancelTransition(state) {
      //Dconsole.clear();
      //console.log('preventing transition.');
      setTimeout(() => {
        state.globalTrans = false;
        //console.log('global trans: ', state.globalTrans);
      },5);
    },
    move(state, sec) {
      console.log('moving to ' + sec);
      state.globalMove(sec);
    }
  },
  actions: {
  },
  modules: {
  }
})
