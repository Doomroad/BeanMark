import { Photo } from "./photo"

export interface Member {
  id: number
  username: string
  age: number
  photoUrl: string
  knownAs: string
  created: Date
  lastActive: Date
  interests: string
  lookingFor: string
  country: string
  city: string
  photos: Photo[]
  introduction: string
  gender: string
}