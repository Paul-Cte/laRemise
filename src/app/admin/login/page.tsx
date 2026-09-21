'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion Admin</h1>
        <form action={formAction} className="flex flex-col gap-5">
          
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center font-medium shadow-sm">
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8] focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-sm">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8] focus:border-transparent transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="mt-2 bg-[#7e7ea8] hover:bg-[#cccce8] text-white hover:text-black font-semibold py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
