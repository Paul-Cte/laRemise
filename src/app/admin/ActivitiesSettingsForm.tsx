'use client';

import { useState, useTransition, useRef } from 'react';
import { updateSetting } from '@/app/actions/settings';
import { uploadImageToStorage } from '@/app/actions/upload';
import { useRouter } from 'next/navigation';

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function ActivitiesSettingsForm({ activitiesData }: { activitiesData: ActivityItem[] }) {
  const [activities, setActivities] = useState<ActivityItem[]>(activitiesData);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleUpdate = (index: number, field: keyof ActivityItem, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setActivities(newActivities);
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    const result = await uploadImageToStorage(formData);
    if (result.url) {
      handleUpdate(index, 'image', result.url);
      setMessage('Image téléchargée avec succès. N\'oubliez pas d\'enregistrer.');
    } else {
      setMessage('Erreur lors du téléchargement : ' + result.error);
    }
    
    setUploadingIndex(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    startTransition(async () => {
      await updateSetting('activities_data', JSON.stringify(activities));
      setMessage('Activités enregistrées avec succès.');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((activity, index) => (
          <div key={activity.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
            <h3 className="font-bold text-gray-700">Activité {index + 1}</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Titre</label>
              <input 
                type="text" 
                value={activity.title}
                onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea 
                value={activity.description}
                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                rows={2}
                className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Image</label>
              <div className="flex flex-col gap-2">
                <input 
                  type="text" 
                  value={activity.image}
                  onChange={(e) => handleUpdate(index, 'image', e.target.value)}
                  placeholder="URL de l'image"
                  className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(index, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadingIndex === index}
                  />
                  <div className={`w-full text-center text-sm py-2 px-3 rounded-lg border border-dashed transition-colors ${uploadingIndex === index ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'}`}>
                    {uploadingIndex === index ? 'Téléchargement...' : '... ou télécharger une image'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        type="submit"
        disabled={isPending}
        className="w-full bg-[#cccce8] hover:bg-[#7e7ea8] text-gray-800 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors duration-300 shadow-sm disabled:opacity-50 mt-4"
      >
        {isPending ? 'Enregistrement...' : 'Enregistrer les activités'}
      </button>

      {message && (
        <p className="text-sm text-green-600 mt-2 font-medium">{message}</p>
      )}
    </form>
  );
}
