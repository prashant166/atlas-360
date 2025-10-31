import { useState } from 'react'

const AudienceLayer = () => {
  const [audienceType, setAudienceType] = useState<'create' | 'saved'>('create')
  const [selectedAudience, setSelectedAudience] = useState('Traditional Loyalist')
  const [audienceName, setAudienceName] = useState('')
  const [audienceDescription, setAudienceDescription] = useState('')


  const toggleAudience = (type: 'create' | 'saved') => {
    setAudienceType(type)
  }

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Audience Layer</h2>
      </div>

      <div className="mt-6 space-y-6 transition-all duration-500 ease-in-out">
          <div>
            <label className="block text-sm font-medium mb-2">Audience Selection</label>
            <div className="flex space-x-4">
              <button 
                onClick={() => toggleAudience('create')}
                className={`px-4 py-2 rounded-lg transition ${
                  audienceType === 'create' 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Create Audience
              </button>
              <button 
                onClick={() => toggleAudience('saved')}
                className={`px-4 py-2 rounded-lg transition ${
                  audienceType === 'saved' 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Saved Audience
              </button>
            </div>

            {audienceType === 'create' && (
              <div className="mt-4 space-y-3">
                <input 
                  type="text" 
                  placeholder="Name your Audience Persona" 
                  className="w-full border rounded-lg p-2 shadow-sm"
                  value={audienceName}
                  onChange={(e) => setAudienceName(e.target.value)}
                />
                <textarea 
                  placeholder="Describe your Audience Persona..." 
                  className="w-full border rounded-lg p-2 h-24 shadow-sm"
                  value={audienceDescription}
                  onChange={(e) => setAudienceDescription(e.target.value)}
                />
              </div>
            )}

            {audienceType === 'saved' && (
              <div className="mt-4">
                <select 
                  className="w-full border rounded-lg p-2 shadow-sm"
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                >
                  <option value="Traditional Loyalist">Traditional Loyalist</option>
                  <option value="Active Enthusiast">Active Enthusiast</option>
                  <option value="Value Buyers">Value Buyers</option>
                </select>
              </div>
            )}
          </div>
        </div>
    </section>
  )
}

export default AudienceLayer