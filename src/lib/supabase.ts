import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afjicmqcqosuiywrgpjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmamljbXFjcW9zdWl5d3JncGpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg4NDEwNSwiZXhwIjoyMDg0NDYwMTA1fQ.VJ7YFRmmWydC2cZx4rPJKRKMUdGfsEdOWJfHsVnnIWo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
