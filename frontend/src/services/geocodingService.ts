interface Coordinates {
  lat: number
  lng: number
}

/**
 * Geocoding service to convert city/state to coordinates
 * Uses Nominatim (OpenStreetMap) API - completely free
 */
export class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search'
  private readonly cache = new Map<string, Coordinates>()
  private lastRequestTime = 0
  private readonly minRequestInterval = 1000 // Nominatim requires 1 request per second

  /**
   * Geocode a Brazilian city/state to coordinates
   */
  async geocode(city: string, state: string): Promise<Coordinates | null> {
    const cacheKey = `${city},${state}`

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Ensure we respect rate limits (1 request per second)
    await this.waitForRateLimit()

    try {
      // Build search query
      const query = `${city}, ${state}, Brazil`

      // Try geocoding
      const coords = await this.tryGeocode(query)

      if (coords) {
        // Cache the result
        this.cache.set(cacheKey, coords)
        return coords
      }

      // Only fallback to state capitals if geocoding completely fails
      return this.getStateCapitalCoordinates(state)
    } catch (error) {
      console.warn(`Geocoding failed for ${city}, ${state}:`, error)
      return this.getStateCapitalCoordinates(state)
    }
  }

  /**
   * Wait to respect Nominatim rate limit (1 request per second)
   */
  private async waitForRateLimit(): Promise<void> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime

    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest
      await this.delay(waitTime)
    }

    this.lastRequestTime = Date.now()
  }

  /**
   * Try to geocode a query using Nominatim (free OpenStreetMap service)
   */
  private async tryGeocode(query: string): Promise<Coordinates | null> {
    try {
      const url = new URL(this.baseUrl)
      url.searchParams.append('q', query)
      url.searchParams.append('format', 'json')
      url.searchParams.append('limit', '1')
      url.searchParams.append('countrycodes', 'br')
      url.searchParams.append('addressdetails', '1')

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'CampanhaPolgo/1.0 (contact: your-email@example.com)'
        }
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        }
      }

      return null
    } catch (error) {
      console.warn(`Failed to geocode "${query}":`, error)
      return null
    }
  }

  /**
   * Delay helper for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Fallback coordinates ONLY for Brazilian state capitals
   * Used as last resort when geocoding completely fails
   */
  private getStateCapitalCoordinates(state: string): Coordinates | null {
    const stateCapitals: Record<string, Coordinates> = {
      // North
      'AM': { lat: -3.1190, lng: -60.0217 },  // Manaus
      'PA': { lat: -1.4558, lng: -48.5039 },  // Belém
      'RO': { lat: -8.7619, lng: -63.9039 },  // Porto Velho
      'RR': { lat: 2.8235, lng: -60.6758 },   // Boa Vista
      'AP': { lat: 0.0349, lng: -51.0694 },   // Macapá
      'TO': { lat: -10.2128, lng: -48.3603 }, // Palmas
      'AC': { lat: -9.9754, lng: -67.8245 },  // Rio Branco

      // Northeast
      'BA': { lat: -12.9714, lng: -38.5014 }, // Salvador
      'CE': { lat: -3.7172, lng: -38.5433 },  // Fortaleza
      'PE': { lat: -8.0476, lng: -34.8770 },  // Recife
      'MA': { lat: -2.5387, lng: -44.2825 },  // São Luís
      'RN': { lat: -5.7945, lng: -35.2110 },  // Natal
      'PB': { lat: -7.1195, lng: -34.8450 },  // João Pessoa
      'AL': { lat: -9.6658, lng: -35.7353 },  // Maceió
      'SE': { lat: -10.9091, lng: -37.0677 }, // Aracaju
      'PI': { lat: -5.0949, lng: -42.8034 },  // Teresina

      // Center-West
      'DF': { lat: -15.8267, lng: -47.9218 }, // Brasília
      'GO': { lat: -16.6869, lng: -49.2648 }, // Goiânia
      'MT': { lat: -15.6014, lng: -56.0979 }, // Cuiabá
      'MS': { lat: -20.4697, lng: -54.6201 }, // Campo Grande

      // Southeast
      'SP': { lat: -23.5505, lng: -46.6333 }, // São Paulo
      'RJ': { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
      'MG': { lat: -19.9167, lng: -43.9345 }, // Belo Horizonte
      'ES': { lat: -20.3155, lng: -40.3128 }, // Vitória

      // South
      'PR': { lat: -25.4284, lng: -49.2733 }, // Curitiba
      'RS': { lat: -30.0346, lng: -51.2177 }, // Porto Alegre
      'SC': { lat: -27.5954, lng: -48.5480 }  // Florianópolis
    }

    return stateCapitals[state] || null
  }

  /**
   * Batch geocode multiple locations with automatic rate limiting
   */
  async geocodeBatch(locations: Array<{ city: string; state: string }>): Promise<Map<string, Coordinates>> {
    const results = new Map<string, Coordinates>()

    for (const location of locations) {
      // geocode() method already handles rate limiting
      const coords = await this.geocode(location.city, location.state)
      if (coords) {
        results.set(`${location.city},${location.state}`, coords)
      }
    }

    return results
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRad(coord2.lat - coord1.lat)
    const dLng = this.toRad(coord2.lng - coord1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(coord1.lat)) *
      Math.cos(this.toRad(coord2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return Math.round(distance * 10) / 10 // Round to 1 decimal place
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

export const geocodingService = new GeocodingService()
