'use client';

import { useState, useTransition } from 'react';
import { updateSetting } from '@/app/actions/settings';
import { useRouter } from 'next/navigation';

export default function ContactSettingsForm({ phone, email }: { phone: string; email: string }) {
  const [currentPhone, setCurrentPhone] = useState(phone);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    startTransition(async () => {
      await updateSetting('contact_phone', currentPhone);
      await updateSetting('contact_email', currentEmail);
      setMessage('Informations de contact enregistrées avec succès.');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Numéro de téléphone</label>
        <input 
          type="text" 
          value={currentPhone}
          onChange={(e) => setCurrentPhone(e.target.value)}
          placeholder="Ex: 01 23 45 67 89"
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all font-medium"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email de contact</label>
        <input 
          type="email" 
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          placeholder="Ex: contact@domaine.fr"
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all font-medium"
        />
      </div>
      
      <button 
        type="submit"
        disabled={isPending}
        className="w-full bg-[#cccce8] hover:bg-[#7e7ea8] text-gray-800 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors duration-300 shadow-sm disabled:opacity-50"
      >
        {isPending ? 'Enregistrement...' : 'Enregistrer'}
      </button>

      {message && (
        <p className="text-sm text-green-600 mt-2 font-medium">{message}</p>
      )}
    </form>
  );
}
