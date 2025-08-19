export const orgConfig = {
  displayName: "Hands of St. Luke Pantry",
  shortName: "Hands of St. Luke",
  parishName: "St. Luke Parish, Long Valley, NJ",
  publicUrl: "https://stlukelv.org/hands-of-st-luke-pantry",
  timezone: "America/New_York",
  contact: {
    phone: "(555) 123-4567",
    email: "volunteer@stlukelv.org",
    coordinator: "Pete Mahoney",
  },
  locations: {
    sources: [
      "ShopRite – Chester",
      "Weis – Hackettstown", 
      "Stop & Shop – Mansfield"
    ],
    recipients: [
      "Hands of St. Luke Pantry",
      "Long Valley Community Assistance",
      "Mt. Olive Food Bank"
    ]
  }
}

export const getOrgDisplayName = () => orgConfig.displayName
export const getParishName = () => orgConfig.parishName
export const getPublicUrl = () => orgConfig.publicUrl
export const getContactInfo = () => orgConfig.contact
export const getLocationNames = () => orgConfig.locations
