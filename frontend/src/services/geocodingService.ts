interface Coordinates {
  lat: number
  lng: number
}

/**
 * Geocoding service to convert city/state to coordinates
 * Uses Nominatim (OpenStreetMap) API for free geocoding
 */
export class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search'
  private readonly cache = new Map<string, Coordinates>()

  /**
   * Geocode a Brazilian city/state to coordinates
   */
  async geocode(city: string, state: string): Promise<Coordinates | null> {
    const cacheKey = `${city},${state}`

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      // Try 1: Search with city, state, and country
      let coords = await this.tryGeocode(`${city}, ${state}, Brazil`)

      // Try 2: If state is wrong or missing, search by city only
      if (!coords && city) {
        coords = await this.tryGeocode(`${city}, Brazil`)
      }

      if (coords) {
        // Cache the result
        this.cache.set(cacheKey, coords)
        return coords
      }

      // If not found, try fallback to known cities
      return this.getFallbackCoordinates(city, state)
    } catch (error) {
      console.error('Geocoding error:', error)
      return this.getFallbackCoordinates(city, state)
    }
  }

  /**
   * Try to geocode a query
   */
  private async tryGeocode(query: string): Promise<Coordinates | null> {
    const url = new URL(this.baseUrl)
    url.searchParams.append('q', query)
    url.searchParams.append('format', 'json')
    url.searchParams.append('limit', '1')
    url.searchParams.append('countrycodes', 'br')

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'CampanhaPolgo/1.0' // Required by Nominatim
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
  }

  /**
   * Fallback coordinates for major Brazilian cities
   */
  private getFallbackCoordinates(city: string, state: string): Coordinates | null {
    const fallbackCities: Record<string, Coordinates> = {
      // North
      'Manaus-AM': { lat: -3.1190, lng: -60.0217 },
      'Belém-PA': { lat: -1.4558, lng: -48.5039 },
      'Porto Velho-RO': { lat: -8.7619, lng: -63.9039 },
      'Boa Vista-RR': { lat: 2.8235, lng: -60.6758 },
      'Macapá-AP': { lat: 0.0349, lng: -51.0694 },
      'Palmas-TO': { lat: -10.2128, lng: -48.3603 },
      'Rio Branco-AC': { lat: -9.9754, lng: -67.8245 },

      // Northeast
      'Salvador-BA': { lat: -12.9714, lng: -38.5014 },
      'Fortaleza-CE': { lat: -3.7172, lng: -38.5433 },
      'Recife-PE': { lat: -8.0476, lng: -34.8770 },
      'São Luís-MA': { lat: -2.5387, lng: -44.2825 },
      'Natal-RN': { lat: -5.7945, lng: -35.2110 },
      'João Pessoa-PB': { lat: -7.1195, lng: -34.8450 },
      'Maceió-AL': { lat: -9.6658, lng: -35.7353 },
      'Aracaju-SE': { lat: -10.9091, lng: -37.0677 },
      'Teresina-PI': { lat: -5.0949, lng: -42.8034 },

      // Center-West
      'Brasília-DF': { lat: -15.8267, lng: -47.9218 },
      'Goiânia-GO': { lat: -16.6869, lng: -49.2648 },
      'Cuiabá-MT': { lat: -15.6014, lng: -56.0979 },
      'Campo Grande-MS': { lat: -20.4697, lng: -54.6201 },

      // Southeast
      'São Paulo-SP': { lat: -23.5505, lng: -46.6333 },
      'Rio de Janeiro-RJ': { lat: -22.9068, lng: -43.1729 },
      'Belo Horizonte-MG': { lat: -19.9167, lng: -43.9345 },
      'Vitória-ES': { lat: -20.3155, lng: -40.3128 },

      // South
      'Curitiba-PR': { lat: -25.4284, lng: -49.2733 },
      'Porto Alegre-RS': { lat: -30.0346, lng: -51.2177 },
      'Florianópolis-SC': { lat: -27.5954, lng: -48.5480 },

      // Additional major cities
      'Campinas-SP': { lat: -22.9099, lng: -47.0626 },
      'Guarulhos-SP': { lat: -23.4538, lng: -46.5333 },
      'São Bernardo do Campo-SP': { lat: -23.6914, lng: -46.5646 },
      'Santo André-SP': { lat: -23.6739, lng: -46.5430 },
      'Osasco-SP': { lat: -23.5329, lng: -46.7920 },
      'Sorocaba-SP': { lat: -23.5015, lng: -47.4526 },
      'Ribeirão Preto-SP': { lat: -21.1704, lng: -47.8103 },
      'Uberlândia-MG': { lat: -18.9189, lng: -48.2772 },
      'Contagem-MG': { lat: -19.9167, lng: -44.0536 },
      'Juiz de Fora-MG': { lat: -21.7645, lng: -43.3467 },
      'Londrina-PR': { lat: -23.3045, lng: -51.1696 },
      'Joinville-SC': { lat: -26.3045, lng: -48.8457 },
      'Caxias do Sul-RS': { lat: -29.1634, lng: -51.1797 },
      'Feira de Santana-BA': { lat: -12.2664, lng: -38.9663 },
      'Jaboatão dos Guararapes-PE': { lat: -8.1130, lng: -35.0148 }
    }

    const key = `${city}-${state}`
    return fallbackCities[key] || null
  }

  /**
   * Batch geocode multiple locations
   */
  async geocodeBatch(locations: Array<{ city: string; state: string }>): Promise<Map<string, Coordinates>> {
    const results = new Map<string, Coordinates>()

    for (const location of locations) {
      // Add delay to respect Nominatim rate limits (1 request per second)
      await new Promise(resolve => setTimeout(resolve, 1000))

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
