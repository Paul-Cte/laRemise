export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          nom: string
          date_creation: string
        }
        Insert: {
          id?: string
          nom: string
          date_creation?: string
        }
        Update: {
          id?: string
          nom?: string
          date_creation?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          updated_at?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          id: string
          category_id: string
          url: string
          texte_alternatif: string | null
          date_creation: string
        }
        Insert: {
          id?: string
          category_id: string
          url: string
          texte_alternatif?: string | null
          date_creation?: string
        }
        Update: {
          id?: string
          category_id?: string
          url?: string
          texte_alternatif?: string | null
          date_creation?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
