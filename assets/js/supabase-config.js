/* ============================================================
   SPINNERZ — Supabase Configuration  (assets/js/supabase-config.js)
   
   ⚠️  Replace the two values below with your actual credentials.
   Get them from: Supabase dashboard → Settings → API
   
   Only use the ANON (public) key here — never the service role key.
   ============================================================ */

const SUPABASE_URL  = 'https://ynxojaashknlarqnflyx.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtb2plbnd3dmN6YXZnc2lkb3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0Mzk3MjIsImV4cCI6MjA5ODAxNTcyMn0.UQ9LYInd-2qvXOn3TpuqDUuB_25T5xntjkn9s4l70W4';

/* ── Low-level fetch wrapper ───────────────────────────────── */
async function sbFetch(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase ${res.status}: ${err}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}