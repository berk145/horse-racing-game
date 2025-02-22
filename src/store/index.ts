import { createStore } from 'vuex'
import raceModule from './race'

export default createStore({
  modules: {
    raceModule,
  },
})
