import { useState } from 'react'
import CanadaMap from './CanadaMap'
import CombinedInsights from './CombinedInsights'
import AudienceSizeTracker from './AudienceSizeTracker'



const GeoInsights = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)



  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Geo Insights</h2>
      
      {/* Map and Tracker Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Geographical view</h3>
          {selectedProvince && (
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Selected: {selectedProvince}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Audience Size Tracker - Left Side (30%) */}
          <div className="w-full lg:w-[30%] flex-shrink-0">
            <AudienceSizeTracker />
          </div>
          
          {/* Canada Map - Right Side (70%) */}
          <div className="w-full lg:w-[70%] flex-shrink-0">
            <CanadaMap 
              onProvinceClick={setSelectedProvince}
              selectedProvince={selectedProvince}
            />
          </div>
        </div>
      </div>


      {/* Combined Insights Section */}
      <CombinedInsights selectedProvince={selectedProvince} />
    </section>
  )
}

export default GeoInsights