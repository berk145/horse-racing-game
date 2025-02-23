import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CurrentRaceResult from '@/components/CurrentRaceResult.vue'

const mockRaceResults = [
  { position: 1, name: 'Thunderbolt' },
  { position: 2, name: 'Lightning' },
  { position: 3, name: 'Storm' },
]

describe('CurrentRaceResult', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CurrentRaceResult, {
      props: {
        results: mockRaceResults,
        resultText: 'Final Race Results',
      },
    })
  })

  it('renders the title correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Final Race Results')
  })

  it('renders the correct number of rows', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockRaceResults.length)
  })

  it('displays race results correctly', () => {
    const rows = wrapper.findAll('tbody tr')

    rows.forEach((row, index) => {
      const columns = row.findAll('td')
      expect(columns[0].text()).toBe((index + 1).toString())
      expect(columns[1].text()).toBe(mockRaceResults[index].name)
    })
  })

  it('renders correctly when there are no race results', () => {
    const wrapper = mount(CurrentRaceResult, {
      props: {
        results: [],
        resultText: 'Final Race Results',
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(0)
  })
})
