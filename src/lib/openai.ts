const API_BASE = '/api';

export async function generateDesign(formData: any) {
  const res = await fetch(`${API_BASE}/generate-design`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to generate design');
  return res.json();
}

export async function analyzeImage(imageBase64: string) {
  const res = await fetch(`${API_BASE}/analyze-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageBase64 }),
  });
  if (!res.ok) throw new Error('Failed to analyze image');
  return res.json();
}

export async function sendChatMessage(message: string, currentDesign: any) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, currentDesign }),
  });
  if (!res.ok) throw new Error('Chat failed');
  return res.json();
}

export async function optimizeBudget(budget: number, roomType: string, style: string) {
  const res = await fetch(`${API_BASE}/budget-optimizer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ budget, roomType, style }),
  });
  if (!res.ok) throw new Error('Budget optimization failed');
  return res.json();
}
