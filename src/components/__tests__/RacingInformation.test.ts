import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createStore, Store } from 'vuex'
import RaceInformation from '@/components/RaceInformation.vue'

interface Race {
  round: number
  distance: number
  participants: Array<{ name: string; color: string }>
  results: Array<{ position: number; name: string }> | null
}

describe('RaceInformation', () => {
  const mockRaces: Race[] = [
    {
      round: 1,
      distance: 1000,
      participants: [
        { name: 'Horse 1', color: 'red' },
        { name: 'Horse 2', color: 'blue' },
      ],
      results: [
        { position: 0, name: 'Horse 2' },
        { position: 1, name: 'Horse 1' },
      ],
    },
    {
      round: 2,
      distance: 1200,
      participants: [
        { name: 'Horse 3', color: 'green' },
        { name: 'Horse 4', color: 'yellow' },
      ],
      results: null,
    },
  ]

  const store: Store<{ allRaces: Race[] }> = createStore({
    getters: {
      allRaces: () => mockRaces,
    },
  })

  it('renders race programs correctly', () => {
    const wrapper = mount(RaceInformation, {
      global: {
        plugins: [store],
      },
    })

    const programTitles = wrapper.findAll('.race-information:first-child .lap-information h4')

    expect(programTitles).toHaveLength(2)

    expect(programTitles[0].text()).toBe('1st Lap - 1000m')
    expect(programTitles[1].text()).toBe('2nd Lap - 1200m')

    const participantRows = wrapper.findAll('.race-information:first-child tbody tr')
    expect(participantRows).toHaveLength(4)
    expect(participantRows[0].text()).toContain('1')
    expect(participantRows[0].text()).toContain('Horse 1')
    expect(participantRows[1].text()).toContain('2')
    expect(participantRows[1].text()).toContain('Horse 2')
  })

  it('renders race results correctly', () => {
    const wrapper = mount(RaceInformation, {
      global: {
        plugins: [store],
      },
    })

    const resultTitles = wrapper.findAll('.race-information:nth-child(2) .lap-information h4')

    expect(resultTitles).toHaveLength(2)

    expect(resultTitles[0].text()).toBe('1st Lap - 1000m')
    expect(resultTitles[1].text()).toBe('2nd Lap - 1200m')

    const resultRows = wrapper.findAll('.race-information:nth-child(2) tbody tr')
    expect(resultRows).toHaveLength(12)

    expect(resultRows[0].text()).toContain('1')
    expect(resultRows[0].text()).toContain('Horse 2')
    expect(resultRows[1].text()).toContain('2')
    expect(resultRows[1].text()).toContain('Horse 1')

    expect(resultRows[2].text()).toContain('1')
    expect(resultRows[2].text()).toContain('-')
    expect(resultRows[3].text()).toContain('2')
    expect(resultRows[3].text()).toContain('-')
  })
})
