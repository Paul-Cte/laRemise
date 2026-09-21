'use client';

import { useState, useTransition } from 'react';
import { updateSetting } from '@/app/actions/settings';
import { useRouter } from 'next/navigation';

type TimelineItem = {
  time?: string;
  description?: string;
  position?: 'top' | 'bottom';
  color: string;
  hasBorder: boolean;
  isEmpty?: boolean;
};

export default function TimelineSettingsForm({ timelineData }: { timelineData: TimelineItem[] }) {
  const [items, setItems] = useState<TimelineItem[]>(timelineData);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUpdate = (index: number, field: keyof TimelineItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    startTransition(async () => {
      await updateSetting('timeline_data', JSON.stringify(items));
      setMessage('Frise chronologique enregistrée avec succès.');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
            <h3 className="font-bold text-gray-700">Étape {index + 1}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Durée (ex: 5 min)</label>
                <input 
                  type="text" 
                  value={item.time || ''}
                  onChange={(e) => handleUpdate(index, 'time', e.target.value)}
                  className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Position</label>
                <select 
                  value={item.position}
                  onChange={(e) => handleUpdate(index, 'position', e.target.value)}
                  className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
                >
                  <option value="top">Haut</option>
                  <option value="bottom">Bas</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea 
                value={item.description || ''}
                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                rows={2}
                className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 transition-all"
              />
            </div>
          </div>
        ))}
      </div>
      
      <button 
        type="submit"
        disabled={isPending}
        className="w-full bg-[#cccce8] hover:bg-[#7e7ea8] text-gray-800 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors duration-300 shadow-sm disabled:opacity-50 mt-4"
      >
        {isPending ? 'Enregistrement...' : 'Enregistrer la frise'}
      </button>

      {message && (
        <p className="text-sm text-green-600 mt-2 font-medium">{message}</p>
      )}
    </form>
  );
}
