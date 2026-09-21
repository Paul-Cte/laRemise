'use client'

import { useState } from 'react'
import { deletePhoto } from '@/app/actions/photos'

export default function AdminGallery({ photos, categories }: { photos: any[], categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category_id === selectedCategory)

  return (
    <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Galerie Photos</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">{filteredPhotos.length} {filteredPhotos.length > 1 ? 'photos publiées' : 'photo publiée'}</p>
        </div>
        
        {/* Filtres de catégories */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === 'all' ? 'bg-[#7e7ea8] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Toutes
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === cat.id ? 'bg-[#7e7ea8] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.nom}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
            <img 
              src={photo.url} 
              alt={photo.texte_alternatif || 'Photo'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Overlay Gradient au survol */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
              <div className="flex justify-end transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <form action={async (formData: FormData) => {
                  await deletePhoto(photo.id, photo.url)
                }}>
                  <button 
                    type="submit" 
                    className="bg-white/10 hover:bg-red-500 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300"
                    title="Supprimer la photo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </form>
              </div>
              
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-[#cccce8] text-[#7e7ea8] text-xs font-bold shadow-sm mb-1">
                  {photo.categories?.nom}
                </span>
                {photo.texte_alternatif && (
                  <p className="text-white/80 text-xs line-clamp-1 font-medium">{photo.texte_alternatif}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredPhotos.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Aucune photo dans cette catégorie.</p>
          </div>
        )}
      </div>
    </section>
  )
}
