<template>
  <HorseRaceHeader />
  <div v-if="renderContent()" class="horse-race-container">
    <HorseList />
    <RaceTrack />
    <RaceInformation />
  </div>
  <div v-else class="no-race-program-container">
    <h3>Please Generate Program to Continue</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import HorseRaceHeader from '@/components/HorseRaceHeader.vue'
import HorseList from '@/components/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceInformation from '@/components/RaceInformation.vue'

export default defineComponent({
  name: 'HorseRace',
  components: {
    HorseRaceHeader,
    HorseList,
    RaceTrack,
    RaceInformation,
  },
  setup() {
    const store = useStore()

    const horses = computed<Horse[]>(() => store.getters.allHorses)
    const races = computed<Race[]>(() => store.getters.allRaces)
    const renderContent = () => horses.value.length > 0

    return {
      horses,
      races,
      renderContent,
    }
  },
})
</script>

<style scoped>
.horse-race-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 24px 20px;
  height: calc(100% - 88px);
}

.no-race-program-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
