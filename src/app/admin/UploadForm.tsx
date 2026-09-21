'use client'

import { useState } from 'react'
import { uploadPhoto } from '@/app/actions/photos'
import SubmitButton from '@/components/admin/SubmitButton'

export default function UploadForm({ categories }: { categories: any[] }) {
  const [fileNames, setFileNames] = useState<string[] | null>(null)

  return (
    <form 
      id="upload-form"
      action={async (formData) => {
        await uploadPhoto(formData)
        setFileNames(null)
        const form = document.getElementById('upload-form') as HTMLFormElement
        if (form) form.reset()
      }} 

      className="flex flex-col gap-5 relative z-10"
    >
      <div className={`group relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors duration-300 ${fileNames && fileNames.length > 0 ? 'border-[#7e7ea8] bg-[#f5f5f5]' : 'border-gray-200 hover:border-[#7e7ea8] bg-gray-50/50 hover:bg-[#f5f5f5]/80'}`}>
        <input 
          type="file" 
          id="file" 
          name="file" 
          accept="image/*" 
          multiple
          required 
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFileNames(Array.from(e.target.files).map(f => f.name))
            } else {
              setFileNames(null)
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm ${fileNames && fileNames.length > 0 ? 'bg-[#7e7ea8] text-white scale-110' : 'bg-white text-[#7e7ea8] group-hover:scale-110'}`}>
            {fileNames && fileNames.length > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            )}
          </div>
          <span className={`text-sm font-semibold transition-colors ${fileNames && fileNames.length > 0 ? 'text-[#7e7ea8]' : 'text-gray-600 group-hover:text-[#7e7ea8]'}`}>
            {fileNames && fileNames.length > 0 
              ? (fileNames.length === 1 ? fileNames[0] : `${fileNames.length} fichiers sélectionnés`) 
              : 'Glissez ou cliquez ici'}
          </span>
          {(!fileNames || fileNames.length === 0) && <span className="text-xs text-gray-400">JPG, PNG, WEBP</span>}
        </div>
      </div>
      
      <div className="relative">
        <select 
          id="category_id" 
          name="category_id" 
          required
          defaultValue=""
          className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all font-medium shadow-inner"
        >
          <option value="" disabled>Sélectionner une catégorie...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div>
        <input 
          type="text" 
          id="texte_alternatif" 
          name="texte_alternatif" 
          placeholder="Texte alternatif (SEO)..."
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all font-medium placeholder-gray-400 shadow-inner"
        />
      </div>

      <SubmitButton 
        loadingText="Publication en cours..."
        className="mt-2 w-full bg-gradient-to-r from-[#7e7ea8] to-[#9a9ac1] hover:from-[#6b6b93] hover:to-[#7e7ea8] text-white shadow-lg shadow-[#7e7ea8]/30 hover:shadow-[#7e7ea8]/50 font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98]"
      >
        {fileNames && fileNames.length > 1 ? `Publier les ${fileNames.length} images` : "Publier l'image"}
      </SubmitButton>
    </form>
  )
}
