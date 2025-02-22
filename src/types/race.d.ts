interface Race {
  round: number
  distance: number
  participants: Horse[]
  results: Horse[] | null
}

interface Horse {
  name: string
  color: string
  condition: number
  position: number
}
