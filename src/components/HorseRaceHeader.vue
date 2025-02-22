<template>
  <header class="horse-race-header">
    <div class="horse-race-header-content">
      <h1 class="horse-race-header-title">Horse Racing</h1>
      <div class="horse-race-header-buttons">
        <button class="generate-program-button" @click="generateProgram">Generate Program</button>
        <button class="start-pause-button" :disabled="disableStartButton()" @click="startRace">
          Start
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import '@/assets/styles/horse-race-header.css'

export default defineComponent({
  name: 'HorseRaceHeader',

  setup() {
    const store = useStore()

    const raceInProgress = computed<boolean>(() => store.getters.raceInProgress)
    const generateProgram = () => {
      store.dispatch('generateProgram')
    }

    const startRace = () => {
      store.dispatch('startRace')
    }
    const disableStartButton = () => {
      return raceInProgress.value
    }
    return {
      generateProgram,
      startRace,
      disableStartButton,
    }
  },
})
</script>
