import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createStore, Store, type ActionContext } from 'vuex'
import HorseRaceHeader from '@/components/HorseRaceHeader.vue'

interface State {
  raceInProgress: boolean
}

let mockStore: Store<State>

describe('HorseRaceHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof HorseRaceHeader>>
  let mockGenerateProgram: Mock
  let mockStartRace: Mock

  const createMockStore = (raceInProgress: boolean = false): Store<State> => {
    return createStore<State>({
      state: {
        raceInProgress,
      },
      getters: {
        raceInProgress: (state) => state.raceInProgress,
      },
      mutations: {
        setRaceInProgress: (state, payload) => {
          state.raceInProgress = payload
        },
      },
      actions: {
        generateProgram: (context: ActionContext<State, State>) => mockGenerateProgram(context),
        startRace: (context: ActionContext<State, State>) => mockStartRace(context),
      },
    })
  }

  beforeEach(() => {
    mockGenerateProgram = vi.fn()
    mockStartRace = vi.fn()

    mockStore = createMockStore(false)

    wrapper = mount(HorseRaceHeader, {
      global: {
        plugins: [mockStore],
      },
    })
  })

  it('renders the correct title', () => {
    expect(wrapper.find('h1').text()).toBe('Horse Racing')
  })

  it('calls generateProgram when the button is clicked', async () => {
    const generateButton = wrapper.find('.generate-program-button')
    await generateButton.trigger('click')
    expect(mockGenerateProgram).toHaveBeenCalled()
  })

  it('calls startRace when the start button is clicked', async () => {
    const startButton = wrapper.find('.start-pause-button')
    await startButton.trigger('click')
    expect(mockStartRace).toHaveBeenCalled()
  })

  it('disables the start button when race is in progress', async () => {
    mockStore.commit('setRaceInProgress', true)
    await wrapper.vm.$nextTick()

    const startButton = wrapper.find('.start-pause-button')
    expect(startButton.attributes('disabled')).toBeDefined()
  })

  it('does not call startRace when the button is clicked while race is in progress', async () => {
    mockStore.commit('setRaceInProgress', true)
    await wrapper.vm.$nextTick()

    const startButton = wrapper.find('.start-pause-button')
    await startButton.trigger('click')
    expect(mockStartRace).not.toHaveBeenCalled()
  })
})
