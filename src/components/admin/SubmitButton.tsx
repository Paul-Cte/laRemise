'use client'

import { useFormStatus } from 'react-dom'

interface Props {
  children: React.ReactNode
  className?: string
  loadingText?: string
  variant?: 'primary' | 'danger' | 'icon'
}

export default function SubmitButton({ children, className = '', loadingText, variant = 'primary' }: Props) {
  const { pending } = useFormStatus()

  if (variant === 'icon') {
    return (
      <button 
        type="submit" 
        disabled={pending}
        className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
        title={pending ? "Chargement..." : ""}
      >
        {pending ? (
          <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : children}
      </button>
    )
  }

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText || 'Chargement...'}
        </>
      ) : (
        children
      )}
    </button>
  )
}
