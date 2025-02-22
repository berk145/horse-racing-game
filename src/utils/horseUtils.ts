import { HorseColors, HorseNames } from '@/mock/horses'
import { deepClone } from './generic'

export const horseGenarate = () => {
  const newHorseList: Array<Horse> = []
  const availableNames = deepClone(HorseNames)
  const availableColors = deepClone(HorseColors)

  for (let i = 0; i < 20; i++) {
    const randomNameIndex = Math.floor(Math.random() * availableNames.length) //Create random index for name
    const randomColorIndex = Math.floor(Math.random() * availableColors.length) // Create random index for color
    newHorseList.push({
      name: availableNames.splice(randomNameIndex, 1)[0], // Assign name and remove the used name from list
      condition: Math.floor(Math.random() * (100 - 50 + 1)) + 50, //REMOVE
      //condition: Math.floor(Math.random() * 99) + 1,
      color: availableColors.splice(randomColorIndex, 1)[0], //  Assign color and remove the color name from list
      position: 0,
    })
  }

  return newHorseList
}

export const generateRaces = (horses: Array<Horse>): Race[] => {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]

  const rounds: Array<Race> = []

  distances.forEach((item, index) => {
    rounds.push({
      distance: item,
      round: index + 1,
      participants: getParticipants(horses),
      results: null,
    })
  })

  return rounds
}

const getParticipants = (horses: Array<Horse>) => {
  const newParticipantsList: Array<Horse> = []
  const availableParticipants = deepClone(horses)
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availableParticipants.length)
    newParticipantsList.push(availableParticipants.splice(randomIndex, 1)[0])
  }

  return newParticipantsList
}
