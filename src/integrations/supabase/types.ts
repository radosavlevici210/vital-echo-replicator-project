export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_chat_sessions: {
        Row: {
          appraisal_id: string | null
          created_at: string | null
          id: string
          session_data: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          appraisal_id?: string | null
          created_at?: string | null
          id?: string
          session_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          appraisal_id?: string | null
          created_at?: string | null
          id?: string
          session_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_sessions_appraisal_id_fkey"
            columns: ["appraisal_id"]
            isOneToOne: false
            referencedRelation: "appraisals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          command_type: string | null
          created_at: string
          id: string
          message: string
          metadata: Json | null
          response: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          command_type?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          response?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          command_type?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          response?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      appraisals: {
        Row: {
          ai_analysis: Json | null
          ai_estimated_value: number | null
          brand: string | null
          category: string
          condition_assessment: string | null
          confidence_score: number | null
          created_at: string | null
          description: string
          expert_notes: string | null
          final_valuation: number | null
          id: string
          image_urls: string[] | null
          market_analysis: Json | null
          market_range_max: number | null
          market_range_min: number | null
          model: string | null
          subcategory: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          validation_status: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          ai_estimated_value?: number | null
          brand?: string | null
          category: string
          condition_assessment?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description: string
          expert_notes?: string | null
          final_valuation?: number | null
          id?: string
          image_urls?: string[] | null
          market_analysis?: Json | null
          market_range_max?: number | null
          market_range_min?: number | null
          model?: string | null
          subcategory?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          validation_status?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          ai_estimated_value?: number | null
          brand?: string | null
          category?: string
          condition_assessment?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          expert_notes?: string | null
          final_valuation?: number | null
          id?: string
          image_urls?: string[] | null
          market_analysis?: Json | null
          market_range_max?: number | null
          market_range_min?: number | null
          model?: string | null
          subcategory?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appraisals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_trail: {
        Row: {
          action_type: string
          appraisal_id: string | null
          id: string
          new_value: Json | null
          old_value: Json | null
          reason: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          appraisal_id?: string | null
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          appraisal_id?: string | null
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          reason?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_trail_appraisal_id_fkey"
            columns: ["appraisal_id"]
            isOneToOne: false
            referencedRelation: "appraisals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_trail_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      browser_sessions: {
        Row: {
          active_tab_index: number | null
          created_at: string
          id: string
          session_name: string | null
          tabs: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_tab_index?: number | null
          created_at?: string
          id?: string
          session_name?: string | null
          tabs?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_tab_index?: number | null
          created_at?: string
          id?: string
          session_name?: string | null
          tabs?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      market_data: {
        Row: {
          brand: string | null
          category: string
          condition_grade: string | null
          created_at: string | null
          data_source: string | null
          demand_score: number | null
          id: string
          last_updated: string | null
          market_price_max: number | null
          market_price_min: number | null
          model: string | null
          subcategory: string | null
        }
        Insert: {
          brand?: string | null
          category: string
          condition_grade?: string | null
          created_at?: string | null
          data_source?: string | null
          demand_score?: number | null
          id?: string
          last_updated?: string | null
          market_price_max?: number | null
          market_price_min?: number | null
          model?: string | null
          subcategory?: string | null
        }
        Update: {
          brand?: string | null
          category?: string
          condition_grade?: string | null
          created_at?: string | null
          data_source?: string | null
          demand_score?: number | null
          id?: string
          last_updated?: string | null
          market_price_max?: number | null
          market_price_min?: number | null
          model?: string | null
          subcategory?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          ai_instructions: string | null
          created_at: string
          deployment_url: string | null
          description: string | null
          github_repo_url: string | null
          id: string
          metadata: Json | null
          name: string
          replit_url: string | null
          status: string | null
          tech_stack: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_instructions?: string | null
          created_at?: string
          deployment_url?: string | null
          description?: string | null
          github_repo_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          replit_url?: string | null
          status?: string | null
          tech_stack?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_instructions?: string | null
          created_at?: string
          deployment_url?: string | null
          description?: string | null
          github_repo_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          replit_url?: string | null
          status?: string | null
          tech_stack?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_credentials: {
        Row: {
          created_at: string
          encrypted_token: string
          expires_at: string | null
          id: string
          metadata: Json | null
          service_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          encrypted_token: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          service_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          encrypted_token?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          service_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      validation_layers: {
        Row: {
          appraisal_id: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          layer_type: string
          status: string | null
          validation_result: Json | null
        }
        Insert: {
          appraisal_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          layer_type: string
          status?: string | null
          validation_result?: Json | null
        }
        Update: {
          appraisal_id?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          layer_type?: string
          status?: string | null
          validation_result?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "validation_layers_appraisal_id_fkey"
            columns: ["appraisal_id"]
            isOneToOne: false
            referencedRelation: "appraisals"
            referencedColumns: ["id"]
          },
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
