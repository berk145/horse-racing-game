import { generateRaces, horseGenarate } from '@/utils/horseUtils'
import type { Module } from 'vuex'

interface State {
  horses: Horse[]
  races: Race[]
  currentRace: Race | null
  raceInProgress: boolean
  roundsPlayed: number | null // Null for never has been played
  reset: boolean
}

const raceModule: Module<State, unknown> = {
  state: () => ({
    horses: [],
    races: [],
    raceInProgress: false,
    currentRace: null,
    roundsPlayed: null,
    reset: false,
  }),
  mutations: {
    generateProgram(state) {
      state.reset = true
      state.raceInProgress = false
      state.currentRace = null
      state.roundsPlayed = null

      const horses = horseGenarate()
      state.horses = [...horses]
      state.races = generateRaces(horses)
    },
    startRace(state) {
      if (state.raceInProgress || state.currentRace !== null) return

      state.raceInProgress = true
    },

    updateRaceResults(state, { round, results }) {
      const raceIndex = state.races.findIndex((r) => r.round === round)

      if (raceIndex !== -1) {
        state.races[raceIndex].results = results
        state.roundsPlayed = round
      }
    },
    updateRestart(state) {
      state.reset = false
    },
  },

  actions: {
    generateProgram({ commit }) {
      commit('generateProgram')
    },

    startRace({ commit }) {
      commit('startRace')
    },

    updateRaceResults({ commit }, { round, results }) {
      commit('updateRaceResults', { round, results })
    },
    updateRestart({ commit }) {
      commit('updateRestart')
    },
  },

  getters: {
    allHorses: (state) => state.horses,
    allRaces: (state) => state.races,
    currentRace: (state) => state.currentRace,
    raceInProgress: (state) => state.raceInProgress,
    roundsPlayed: (state) => state.roundsPlayed,
    reset: (state) => state.reset,
  },
}

export default raceModule
