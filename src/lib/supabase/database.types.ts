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
      moodboards: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "moodboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      moodboard_items: {
        Row: {
          id: string
          moodboard_id: string
          item_type: string
          image_url: string
          source_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          moodboard_id: string
          item_type: string
          image_url: string
          source_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          moodboard_id?: string
          item_type?: string
          image_url?: string
          source_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "moodboard_items_moodboard_id_fkey"
            columns: ["moodboard_id"]
            isOneToOne: false
            referencedRelation: "moodboards"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          role: 'customer' | 'professional' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          role?: 'customer' | 'professional' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'customer' | 'professional' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          id: string
          owner_id: string
          business_name: string
          slug: string
          type: 'designer' | 'brand' | 'school' | 'stylist' | 'tailor' | 'photographer' | 'agency' | 'store'
          description: string | null
          logo_url: string | null
          cover_image_url: string | null
          is_verified: boolean
          city: string
          state: string
          address: string | null
          rating: number | null
          review_count: number | null
          starting_price: number | null
          response_time_hours: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          business_name: string
          slug: string
          type: 'designer' | 'brand' | 'school' | 'stylist' | 'tailor' | 'photographer' | 'agency' | 'store'
          description?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          is_verified?: boolean
          city: string
          state: string
          address?: string | null
          rating?: number | null
          review_count?: number | null
          starting_price?: number | null
          response_time_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          business_name?: string
          slug?: string
          type?: 'designer' | 'brand' | 'school' | 'stylist' | 'tailor' | 'photographer' | 'agency' | 'store'
          description?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          is_verified?: boolean
          city?: string
          state?: string
          address?: string | null
          rating?: number | null
          review_count?: number | null
          starting_price?: number | null
          response_time_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      business_categories: {
        Row: {
          business_id: string
          category_id: string
        }
        Insert: {
          business_id: string
          category_id: string
        }
        Update: {
          business_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_categories_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          starting_price: number | null
          duration_days: number | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          name: string
          description?: string | null
          starting_price?: number | null
          duration_days?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          name?: string
          description?: string | null
          starting_price?: number | null
          duration_days?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolios: {
        Row: {
          id: string
          business_id: string
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          title?: string
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolio_media: {
        Row: {
          id: string
          portfolio_id: string
          image_url: string
          caption: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          image_url: string
          caption?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          image_url?: string
          caption?: string | null
          display_order?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_media_portfolio_id_fkey"
            columns: ["portfolio_id"]
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          }
        ]
      }
      favourites: {
        Row: {
          id: string
          user_id: string
          business_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "favourites_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favourites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      comparisons: {
        Row: {
          id: string
          user_id: string
          business_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comparisons_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparisons_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          business_id: string
          reviewer_id: string
          rating: number
          content: string | null
          is_verified_purchase: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          reviewer_id: string
          rating: number
          content?: string | null
          is_verified_purchase?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          reviewer_id?: string
          rating?: number
          content?: string | null
          is_verified_purchase?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      review_responses: {
        Row: {
          id: string
          review_id: string
          business_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          review_id: string
          business_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          business_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_responses_review_id_fkey"
            columns: ["review_id"]
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_responses_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          id: string
          customer_id: string
          business_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          business_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          business_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      quote_requests: {
        Row: {
          id: string
          customer_id: string
          business_id: string
          occasion: string | null
          budget_range: string | null
          target_date: string | null
          details: string
          status: 'pending' | 'responded' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          business_id: string
          occasion?: string | null
          budget_range?: string | null
          target_date?: string | null
          details: string
          status?: 'pending' | 'responded' | 'accepted' | 'declined'
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          business_id?: string
          occasion?: string | null
          budget_range?: string | null
          target_date?: string | null
          details?: string
          status?: 'pending' | 'responded' | 'accepted' | 'declined'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_requests_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      quote_responses: {
        Row: {
          id: string
          quote_request_id: string
          business_id: string
          estimated_price: number
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          quote_request_id: string
          business_id: string
          estimated_price: number
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          quote_request_id?: string
          business_id?: string
          estimated_price?: number
          message?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_responses_quote_request_id_fkey"
            columns: ["quote_request_id"]
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_responses_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      appointments: {
        Row: {
          id: string
          customer_id: string
          business_id: string
          appointment_date: string
          appointment_type: 'virtual' | 'in-person'
          status: 'requested' | 'confirmed' | 'cancelled' | 'completed'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          business_id: string
          appointment_date: string
          appointment_type: 'virtual' | 'in-person'
          status?: 'requested' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          business_id?: string
          appointment_date?: string
          appointment_type?: 'virtual' | 'in-person'
          status?: 'requested' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: { id: string, business_id: string, name: string, description: string | null, base_price: number, image_url: string | null, is_published: boolean, created_at: string }
        Insert: { id?: string, business_id: string, name: string, description?: string | null, base_price: number, image_url?: string | null, is_published?: boolean, created_at?: string }
        Update: { id?: string, business_id?: string, name?: string, description?: string | null, base_price?: number, image_url?: string | null, is_published?: boolean, created_at?: string }
        Relationships: [{ foreignKeyName: "products_business_id_fkey", columns: ["business_id"], referencedRelation: "businesses", referencedColumns: ["id"] }]
      }
      product_variants: {
        Row: { id: string, product_id: string, sku: string | null, size: string | null, color: string | null, inventory_count: number, price_adjustment: number, created_at: string }
        Insert: { id?: string, product_id: string, sku?: string | null, size?: string | null, color?: string | null, inventory_count?: number, price_adjustment?: number, created_at?: string }
        Update: { id?: string, product_id?: string, sku?: string | null, size?: string | null, color?: string | null, inventory_count?: number, price_adjustment?: number, created_at?: string }
        Relationships: [{ foreignKeyName: "product_variants_product_id_fkey", columns: ["product_id"], referencedRelation: "products", referencedColumns: ["id"] }]
      }
      orders: {
        Row: { id: string, customer_id: string | null, total_amount: number, status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled', shipping_address: string, created_at: string }
        Insert: { id?: string, customer_id?: string | null, total_amount: number, status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled', shipping_address: string, created_at?: string }
        Update: { id?: string, customer_id?: string | null, total_amount?: number, status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled', shipping_address?: string, created_at?: string }
        Relationships: [{ foreignKeyName: "orders_customer_id_fkey", columns: ["customer_id"], referencedRelation: "profiles", referencedColumns: ["id"] }]
      }
      order_items: {
        Row: { id: string, order_id: string, product_variant_id: string | null, quantity: number, unit_price: number, created_at: string }
        Insert: { id?: string, order_id: string, product_variant_id?: string | null, quantity?: number, unit_price: number, created_at?: string }
        Update: { id?: string, order_id?: string, product_variant_id?: string | null, quantity?: number, unit_price?: number, created_at?: string }
        Relationships: [
          { foreignKeyName: "order_items_order_id_fkey", columns: ["order_id"], referencedRelation: "orders", referencedColumns: ["id"] },
          { foreignKeyName: "order_items_product_variant_id_fkey", columns: ["product_variant_id"], referencedRelation: "product_variants", referencedColumns: ["id"] }
        ]
      }
      jobs: {
        Row: { id: string, business_id: string, title: string, type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance', location: string, description: string, salary_range: string | null, is_active: boolean, created_at: string }
        Insert: { id?: string, business_id: string, title: string, type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance', location: string, description: string, salary_range?: string | null, is_active?: boolean, created_at?: string }
        Update: { id?: string, business_id?: string, title?: string, type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance', location?: string, description?: string, salary_range?: string | null, is_active?: boolean, created_at?: string }
        Relationships: [{ foreignKeyName: "jobs_business_id_fkey", columns: ["business_id"], referencedRelation: "businesses", referencedColumns: ["id"] }]
      }
      job_applications: {
        Row: { id: string, job_id: string, applicant_id: string, resume_url: string | null, cover_letter: string | null, status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired', created_at: string }
        Insert: { id?: string, job_id: string, applicant_id: string, resume_url?: string | null, cover_letter?: string | null, status?: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired', created_at?: string }
        Update: { id?: string, job_id?: string, applicant_id?: string, resume_url?: string | null, cover_letter?: string | null, status?: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired', created_at?: string }
        Relationships: [
          { foreignKeyName: "job_applications_job_id_fkey", columns: ["job_id"], referencedRelation: "jobs", referencedColumns: ["id"] },
          { foreignKeyName: "job_applications_applicant_id_fkey", columns: ["applicant_id"], referencedRelation: "profiles", referencedColumns: ["id"] }
        ]
      }
      events: {
        Row: { id: string, business_id: string, title: string, description: string | null, event_date: string, location: string, ticket_price: number, capacity: number | null, image_url: string | null, created_at: string }
        Insert: { id?: string, business_id: string, title: string, description?: string | null, event_date: string, location: string, ticket_price?: number, capacity?: number | null, image_url?: string | null, created_at?: string }
        Update: { id?: string, business_id?: string, title?: string, description?: string | null, event_date?: string, location?: string, ticket_price?: number, capacity?: number | null, image_url?: string | null, created_at?: string }
        Relationships: [{ foreignKeyName: "events_business_id_fkey", columns: ["business_id"], referencedRelation: "businesses", referencedColumns: ["id"] }]
      }
      event_registrations: {
        Row: { id: string, event_id: string, attendee_id: string, status: string, created_at: string }
        Insert: { id?: string, event_id: string, attendee_id: string, status?: string, created_at?: string }
        Update: { id?: string, event_id?: string, attendee_id?: string, status?: string, created_at?: string }
        Relationships: [
          { foreignKeyName: "event_registrations_event_id_fkey", columns: ["event_id"], referencedRelation: "events", referencedColumns: ["id"] },
          { foreignKeyName: "event_registrations_attendee_id_fkey", columns: ["attendee_id"], referencedRelation: "profiles", referencedColumns: ["id"] }
        ]
      }
      articles: {
        Row: { id: string, title: string, slug: string, content: string, cover_image_url: string | null, author_id: string | null, published_at: string | null, created_at: string }
        Insert: { id?: string, title: string, slug: string, content: string, cover_image_url?: string | null, author_id?: string | null, published_at?: string | null, created_at?: string }
        Update: { id?: string, title?: string, slug?: string, content?: string, cover_image_url?: string | null, author_id?: string | null, published_at?: string | null, created_at?: string }
        Relationships: [{ foreignKeyName: "articles_author_id_fkey", columns: ["author_id"], referencedRelation: "profiles", referencedColumns: ["id"] }]
      }
      promoted_campaigns: {
        Row: { id: string, business_id: string, target_type: 'profile' | 'product' | 'event', target_id: string | null, status: 'pending_payment' | 'active' | 'expired' | 'cancelled', amount_paid: number, starts_at: string | null, expires_at: string | null, impressions: number, clicks: number, created_at: string, updated_at: string }
        Insert: { id?: string, business_id: string, target_type?: 'profile' | 'product' | 'event', target_id?: string | null, status?: 'pending_payment' | 'active' | 'expired' | 'cancelled', amount_paid?: number, starts_at?: string | null, expires_at?: string | null, impressions?: number, clicks?: number, created_at?: string, updated_at?: string }
        Update: { id?: string, business_id?: string, target_type?: 'profile' | 'product' | 'event', target_id?: string | null, status?: 'pending_payment' | 'active' | 'expired' | 'cancelled', amount_paid?: number, starts_at?: string | null, expires_at?: string | null, impressions?: number, clicks?: number, created_at?: string, updated_at?: string }
        Relationships: [{ foreignKeyName: "promoted_campaigns_business_id_fkey", columns: ["business_id"], referencedRelation: "businesses", referencedColumns: ["id"] }]
      }
      measurement_profiles: {
        Row: { id: string, user_id: string, profile_name: string, measurements: Json, created_at: string, updated_at: string }
        Insert: { id?: string, user_id: string, profile_name: string, measurements: Json, created_at?: string, updated_at?: string }
        Update: { id?: string, user_id?: string, profile_name?: string, measurements?: Json, created_at?: string, updated_at?: string }
        Relationships: [{ foreignKeyName: "measurement_profiles_user_id_fkey", columns: ["user_id"], referencedRelation: "profiles", referencedColumns: ["id"] }]
      }
      escrow_transactions: {
        Row: { id: string, order_id: string, amount: number, status: string, created_at: string, updated_at: string }
        Insert: { id?: string, order_id: string, amount: number, status?: string, created_at?: string, updated_at?: string }
        Update: { id?: string, order_id?: string, amount?: number, status?: string, created_at?: string, updated_at?: string }
        Relationships: [{ foreignKeyName: "escrow_transactions_order_id_fkey", columns: ["order_id"], referencedRelation: "orders", referencedColumns: ["id"] }]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'customer' | 'professional' | 'admin'
      business_type: 'designer' | 'brand' | 'school' | 'stylist' | 'tailor' | 'photographer' | 'agency' | 'store'
      quote_status: 'pending' | 'responded' | 'accepted' | 'declined'
      appointment_type: 'virtual' | 'in-person'
      appointment_status: 'requested' | 'confirmed' | 'cancelled' | 'completed'
      order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
      job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
      application_status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired'
      campaign_status: 'pending_payment' | 'active' | 'expired' | 'cancelled'
      campaign_target_type: 'profile' | 'product' | 'event'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
