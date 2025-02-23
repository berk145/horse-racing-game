<template>
  <div class="race-information-container">
    <div class="race-information">
      <h3>Programs</h3>

      <div v-for="(race, index) in races" :key="index" class="lap-information">
        <h4>{{ getTitleText(race.round, race.distance) }}</h4>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(participant, index) in race.participants"
              :key="participant.name + participant.color"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ participant.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="race-information">
      <h3>Results</h3>

      <div v-for="(race, index) in races" :key="index" class="lap-information">
        <h4>{{ getTitleText(race.round, race.distance) }}</h4>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="participant in getRaceResults(race)"
              :key="participant.name + participant.position"
            >
              <td>{{ participant.position + 1 }}</td>
              <td>{{ participant.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { intToOrdinalNumberString } from '@/utils/generic'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import '@/assets/styles/horse-race-information.css'

export default defineComponent({
  name: 'RaceInformation',
  components: {},
  setup() {
    const store = useStore()

    const races = computed<Race[]>(() => store.getters.allRaces)

    const getRaceResults = (race: Race) => {
      if (race.results === null) {
        return Array(10)
          .fill(null)
          .map((_, index) => ({ position: index, name: '-' }))
      }
      return race.results
    }

    const getTitleText = (round: number, distance: number) => {
      return `${intToOrdinalNumberString(round)} Lap - ${distance}m`
    }

    return {
      races,
      intToOrdinalNumberString,
      getRaceResults,
      getTitleText,
    }
  },
})
</script>
