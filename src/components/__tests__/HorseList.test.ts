import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import HorseList from '@/components/HorseList.vue'

interface Horse {
  name: string
  condition: number
  color: string
}

const mockHorses: Horse[] = [
  { name: 'Shadowfax', condition: 97, color: 'white' },
  { name: 'Black Beauty', condition: 72, color: 'black' },
  { name: 'Thunder', condition: 85, color: 'brown' },
]

interface State {
  horses: Horse[]
}

const createMockStore = (horses: Horse[]): Store<State> => {
  return createStore({
    state: {
      horses,
    },
    getters: {
      allHorses: (): Horse[] => horses,
    },
  })
}

describe('HorseList', () => {
  let wrapper: VueWrapper<InstanceType<typeof HorseList>>
  let store: Store<State>

  beforeEach(() => {
    store = createMockStore(mockHorses)
    wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })
  })

  it('renders the horse list header', () => {
    expect(wrapper.find('h3').text()).toBe('Horse List (1-20)')
  })

  it('renders the correct number of horse rows', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockHorses.length)
  })

  it('displays horse data correctly', () => {
    const rows = wrapper.findAll('tbody tr')

    rows.forEach((row, index) => {
      const columns = row.findAll('td')
      expect(columns[0].text()).toBe(mockHorses[index].name)
      expect(Number(columns[1].text())).toBe(mockHorses[index].condition)
      expect(columns[2].text()).toBe(mockHorses[index].color)
      expect(columns[2].element.style.color).toBe(mockHorses[index].color)
    })
  })
})
