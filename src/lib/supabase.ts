export async function signUp(email: string, password: string) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, action: 'signup' }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}

export async function signIn(email: string, password: string) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, action: 'signin' }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Sign in failed');
  return data;
}

export async function signOut() {
  await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'signout' }),
  });
}

export async function getSession() {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'session' }),
  });
  const data = await res.json();
  return data.user || null;
}

export async function saveDesign(designData: Record<string, unknown>) {
  const res = await fetch('/api/user/designs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(designData),
  });
  if (!res.ok) throw new Error('Failed to save design');
  const data = await res.json();
  return data.design;
}

export async function getUserDesigns() {
  const res = await fetch('/api/user/designs');
  if (!res.ok) return [];
  const data = await res.json();
  return data.designs || [];
}

export async function deleteDesign(designId: string) {
  await fetch(`/api/user/designs?id=${designId}`, { method: 'DELETE' });
}

export default getSession;
