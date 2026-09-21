'use client'

import { useState } from 'react'
import { updateSetting } from '@/app/actions/settings'
import { uploadImageToStorage } from '@/app/actions/upload'
import { useRouter } from 'next/navigation'

export default function HeroSettingsForm({ currentImage }: { currentImage: string }) {
  const [url, setUrl] = useState(currentImage)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    const result = await uploadImageToStorage(formData);
    if (result.url) {
      setUrl(result.url);
      setMessage('Image téléchargée. N\'oubliez pas d\'enregistrer.');
    } else {
      setMessage('Erreur: ' + result.error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const result = await updateSetting('hero_image', url)
    
    if (result.error) {
      setMessage('Erreur: ' + result.error)
    } else {
      setMessage('Image mise à jour avec succès !')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de l'image
        </label>
        <div className="flex flex-col gap-2">
          <input 
            type="url" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..." 
            required 
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all"
          />
          <div className="relative mt-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            <div className={`w-full text-center text-sm py-2.5 px-3 rounded-lg border border-dashed transition-colors ${loading ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'}`}>
              {loading ? 'Téléchargement...' : '... ou télécharger une image depuis votre ordinateur'}
            </div>
          </div>
        </div>
      </div>
      
      {currentImage && (
        <div className="rounded-xl overflow-hidden border border-gray-200 h-32 relative">
          <img src={currentImage} alt="Hero actuel" className="w-full h-full object-cover" />
        </div>
      )}

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-[#cccce8] hover:bg-[#7e7ea8] text-gray-800 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>

      {message && (
        <p className={`text-sm text-center font-medium ${message.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
