import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvkwrxwetdsolpsjhdwm.supabase.co'
const supabaseKey = 'sb_publishable_M17n5mJrkI7TdgVhiwwlmg_LNdA8d2Y'

export const supabase = createClient(supabaseUrl, supabaseKey)