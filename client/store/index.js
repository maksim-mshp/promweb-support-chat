import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      chats: {
        
      },
      scroll: true
    },
    mutations: {
      set_chats(state, payload) {
        if (JSON.stringify(state.chats) != JSON.stringify(payload)) {
          state.scroll = true;
        }
        payload.forEach(element => {
          state.chats[element['secret']] = element;
        });
      }
    }
  });

export default store;
