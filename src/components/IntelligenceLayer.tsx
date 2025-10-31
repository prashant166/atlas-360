import { useState } from 'react'

interface IntelligenceLayerProps {
  onSubmit: () => void
}

const IntelligenceLayer = ({ onSubmit }: IntelligenceLayerProps) => {
  const [isLoading, setIsLoading] = useState(false)
  
  // Brand Performance Context
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCompetitors, setSelectedCompetitors] = useState('')
  const [selectedMarketPosition, setSelectedMarketPosition] = useState('')
  
  // TV Share of Voice
  const [selectedSOVBrand, setSelectedSOVBrand] = useState('')
  const [selectedSOV, setSelectedSOV] = useState('')
  
  // Content Affinity
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMediaPreference, setSelectedMediaPreference] = useState('')
  
  // Store Proximity
  const [selectedRetailer, setSelectedRetailer] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [distance, setDistance] = useState(0)


  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSubmit()
    }, 1200)
  }

  const showSliderValue = (value: number) => {
    setDistance(value)
  }

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Intelligence Layer</h2>
      </div>

      <div className="mt-6 space-y-8 transition-all duration-500 ease-in-out">
          <div className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <h3 className="font-semibold text-lg mb-3">Brand Performance Context</h3>
            <p className="text-sm text-gray-600 mb-3">Combine Brand Market Share, Category Sales Trend & Competitive Intelligence</p>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                <option value="Coca-Cola">Coca-Cola</option>
                <option value="Mentos">Mentos</option>
                <option value="Kraft">Kraft</option>
              </select>
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
              </select>
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedCompetitors}
                onChange={(e) => setSelectedCompetitors(e.target.value)}
              >
                <option value="">Competitors</option>
                <option value="Pepsi">Pepsi</option>
                <option value="Cadbury">Cadbury</option>
              </select>
            </div>
            <select 
              className="border rounded-lg p-2 shadow-sm w-full"
              value={selectedMarketPosition}
              onChange={(e) => setSelectedMarketPosition(e.target.value)}
            >
              <option value="">Select Market Position</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <h3 className="font-semibold text-lg mb-3">TV Share of Voice</h3>
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedSOVBrand}
                onChange={(e) => setSelectedSOVBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                <option value="Coca-Cola">Coca-Cola</option>
                <option value="Mentos">Mentos</option>
              </select>
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedSOV}
                onChange={(e) => setSelectedSOV(e.target.value)}
              >
                <option value="">Select SOV</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <h3 className="font-semibold text-lg mb-3">Content Affinity</h3>
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Select Genre</option>
                <option value="Sports">Sports</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </select>
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedMediaPreference}
                onChange={(e) => setSelectedMediaPreference(e.target.value)}
              >
                <option value="">Select Media Preference</option>
                <option value="CTV">CTV</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>
          </div>

          <div className="p-4 border rounded-xl hover:bg-gray-50 transition">
            <h3 className="font-semibold text-lg mb-3">Store Proximity</h3>
            <div className="grid grid-cols-3 gap-4">
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedRetailer}
                onChange={(e) => setSelectedRetailer(e.target.value)}
              >
                <option value="">Select Retailer</option>
                <option value="Tesco">Tesco</option>
                <option value="Sainsbury's">Sainsbury's</option>
              </select>
              <select 
                className="border rounded-lg p-2 shadow-sm"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                <option value="Ontario">Ontario</option>
                <option value="Quebec">Quebec</option>
              </select>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Distance (miles): <span>{distance} miles</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={distance}
                  className="w-full" 
                  onChange={(e) => showSliderValue(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary px-6 py-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                Submit
                <span className="spinner"></span>
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
    </section>
  )
}

export default IntelligenceLayer