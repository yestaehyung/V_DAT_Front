import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voice: null,
    sensor: null,
    anomaly: null,
    video:null
  },
  getters: {
    getSensor(state){
      return state.sensor
    },
    getVoice(state){
      return state.voice
    },
    getAnomaly(state){
      return state.anomaly
    },
    getVideo(state){
      return state.video
    }
  },
  mutations: {
    addSensor: function(state, payload){
      state.sensor = payload.sensor;
    },
    addVoice: function(state, payload){
      state.voice = payload.voice;
    },
    addAnomaly: function(state, payload){
      state.anomaly = payload.anomaly;
    },
    addVideo: function(state, payload){
      state.video = payload.video;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      // path: ['anomaly','video']
    })
  ]

})
