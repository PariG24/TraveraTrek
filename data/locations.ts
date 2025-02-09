export type Location = {
  id: string
  name: string
  address: string
  country: string
  instagramLink: string
  coordinates: [number, number] // [latitude, longitude]
}
 /*{
    id: "pranakhon-thai",
    name: "Pranakhon Thai Restaurant",
    address: "88 University Pl, New York, NY 10003",
    country: "United States",
    instagramLink: "https://www.instagram.com/p/CmPNjPHPC0u/?igsh=MWV2dGJ0dWE4M2RyOA%3D%3D",
    coordinates: [40.7339, -73.9936],
  },*/

export const locations: Location[] = [
  {
    id: "echelon",
    name: "Echelon Kitchen & Bar",
    address: "200 S Main St, Ann Arbor, MI 48104",
    country: "United States",
    instagramLink: "https://www.instagram.com/p/DFf2BbrvVu9/?igsh=cDVkOGlwNW52bW9t",
    coordinates: [42.28049979030095, -83.74893527433996],
  },
  /*{
    id: "pranakhon-thai",
    name: "Pranakhon Thai Restaurant",
    address: "88 University Pl, New York, NY 10003",
    country: "United States",
    instagramLink: "https://www.instagram.com/p/CmPNjPHPC0u/?igsh=MWV2dGJ0dWE4M2RyOA%3D%3D",
    coordinates: [40.7339, -73.9936],
  },
  {
    id: "baar-baar",
    name: "Baar Baar",
    address: "13 E 1st St, New York, NY 10003",
    country: "United States",
    instagramLink: "https://www.instagram.com/p/CVh_j36lTiE/",
    coordinates: [40.7235, -73.9898],
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
    country: "India",
    instagramLink: "https://www.instagram.com/p/CrUjE71vFAr/",
    coordinates: [27.1751, 78.0421],
  },*/
]

