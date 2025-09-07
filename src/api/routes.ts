export type RouteStats = {
  lengthKm: number
  elevationGainM: number
  estimatedTimeH: number
}

export type RouteReview = {
  user: string
  rating: number
  text: string
}

export type RouteItem = {
  id: string
  name: string
  rating: number
  author: string
  location: string
  shortDescription: string
  stats: RouteStats
  description: string
  coords: { lat: number; lng: number }
  images: string[]
  features: string[]
  reviews: RouteReview[]
}

let cache: RouteItem[] | null = null

export async function fetchRoutes(): Promise<RouteItem[]> {
  if (cache) return cache
  const res = await fetch('/data/routes.json')
  if (!res.ok) throw new Error('Failed to load routes')
  cache = (await res.json()) as RouteItem[]
  return cache
}

export async function fetchRouteById(id: string): Promise<RouteItem | undefined> {
  const all = await fetchRoutes()
  return all.find((r) => r.id === id)
}


