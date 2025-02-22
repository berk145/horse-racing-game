<template>
  <div class="current-race-result-container">
    <h2>{{ title }}</h2>

    <div class="lap-result">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in raceResults" :key="horse.position">
            <td>{{ index + 1 }}</td>
            <td>{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import '@/assets/styles/current-race-results.css'

export default defineComponent({
  name: 'CurrentRaceResult',
  props: {
    results: {
      type: Array<Horse>,
      required: true,
    },
    resultText: {
      type: String,
      required: true,
    },
  },
  setup({ results, resultText }) {
    return { raceResults: results, title: resultText }
  },
})
</script>
