// ===== Общие настройки Supabase =====
const SUPABASE_URL = "https://jezwkodmpebnsuvkcbem.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implendrb2RtcGVibnN1dmtjYmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDczNDksImV4cCI6MjA5OTEyMzM0OX0.m0ufckWqLyT6CY9emxm5Ju8WoQoYXYlw6Sq4pvhouZQ";

function sbHeaders(extra){
  return Object.assign({
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
  }, extra || {});
}

async function sbGet(path){
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, { headers: sbHeaders() });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}
async function sbPost(table, body){
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table, {
    method: 'POST', headers: sbHeaders({ 'Prefer': 'return=representation' }), body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}
async function sbPatch(table, filter, body){
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + filter, {
    method: 'PATCH', headers: sbHeaders({ 'Prefer': 'return=representation' }), body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}
