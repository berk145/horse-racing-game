<template>
  <div v-if="!displayRaceResults" class="race-track">
    <div class="lanes">
      <div class="lane" v-for="horse in horses" :key="horse.name + horse.color">
        <div>
          <p>{{ horse.name }}</p>
        </div>
        <div class="horse" :style="horseStyle(horse)">
          <HorseIcon :icon-color="horse.color" />
        </div>
      </div>
    </div>
    <div class="finish-line"></div>
  </div>
  <div v-else>
    <CurrentRaceResult :results="finishedHorses" :result-text="resultText" />
    <div class="start-next-round-container">
      <button v-if="displayNextRoundButton()" @click="startNextRoundClicked">
        Start Next Round
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import CurrentRaceResult from '@/components/CurrentRaceResult.vue'
import { intToOrdinalNumberString } from '@/utils/generic'
import HorseIcon from '@/assets/icons//horseIcon.vue'

import '@/assets/styles/horse-race-track.css'

export default defineComponent({
  name: 'RaceTrack',
  components: {
    HorseIcon,
    CurrentRaceResult,
  },
  setup() {
    const store = useStore()

    const allRaces = computed<Array<Race>>(() => store.getters.allRaces)
    const roundsPlayed = computed<number>(() => store.getters.roundsPlayed)
    const roundInProgress = ref(false)
    const currentRound = ref<Race | null>(null)
    const finishedHorses = ref<Array<Horse>>([])
    const displayRaceResults = ref<boolean>(false)
    const resultsText = ref<string>('')

    watch(
      () => store.getters.raceInProgress,
      (value) => {
        if (roundsPlayed.value === null && value) {
          currentRound.value = { ...allRaces.value[0] } as Race // For assigning the first round
          animateHorses()
        }
      },
    )

    watch(
      () => store.getters.reset,
      (value) => {
        if (value) {
          roundInProgress.value = false
          currentRound.value = null
          finishedHorses.value = []
          displayRaceResults.value = false
          store.commit('updateRestart')
        }
      },
      { deep: true, immediate: true },
    )

    const animateHorses = () => {
      roundInProgress.value = true

      const raceInterval = setInterval(() => {
        if (currentRound.value) {
          currentRound.value.participants.forEach((horse) => {
            if (horse.position < 90) {
              horse.position += (horse.condition / 100) * 0.9
            }

            if (horse.position >= 90 && !finishedHorses.value.includes(horse)) {
              finishedHorses.value.push(horse)
            }
          })
          if (finishedHorses.value.length === currentRound.value.participants.length) {
            clearInterval(raceInterval)
            const newFinishedHorses = finishedHorses.value.map((x, index) => ({
              ...x,
              position: index + 1,
            }))
            store.commit('updateRaceResults', {
              round: currentRound.value.round,
              results: newFinishedHorses,
            })
            resultsText.value = `${intToOrdinalNumberString(currentRound.value.round)} Lap - ${currentRound.value.distance}m`
            displayRaceResults.value = true
            roundInProgress.value = false
            currentRound.value = null
          }
        }
      }, 30)
    }

    const startNextRoundClicked = () => {
      if (roundsPlayed.value > 0) {
        displayRaceResults.value = false
        resultsText.value = ''
        finishedHorses.value = []

        currentRound.value = { ...allRaces.value[roundsPlayed.value] } as Race

        animateHorses()
      }
    }

    const displayNextRoundButton = () => {
      if (roundsPlayed.value >= allRaces.value.length) {
        return false
      }
      return true
    }

    const horseStyle = (horse: Horse) => {
      return {
        left: `${horse.position}%`,
      }
    }
    const participatingHorses = computed(() => currentRound.value?.participants)

    const resultTitle = computed(() => resultsText.value)

    return {
      horses: participatingHorses,
      horseStyle,
      displayRaceResults,
      finishedHorses,
      resultText: resultTitle,
      startNextRoundClicked,
      displayNextRoundButton,
    }
  },
})
</script>
