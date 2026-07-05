import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjwxuykltxonkxmgoykr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqd3h1eWtsdHhvbmt4bWdveWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTA0MTEsImV4cCI6MjA5MTgyNjQxMX0.jyiMLSs2gQWQaVRFB47K-C9ElKeynnL5bKAv53MobzI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)