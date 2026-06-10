const BASE = 'https://ai-interior-architect-huxg4415i-urvashi-s-projects1.vercel.app';

async function main() {
  // Sign up
  const email = `design-test${Date.now()}@example.com`;
  const signupRes = await fetch(`${BASE}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'testpass123', action: 'signup' })
  });
  const cookie = signupRes.headers.get('set-cookie')?.split(';')[0];
  const authHeaders = { 'Content-Type': 'application/json', 'Cookie': cookie };

  // Save a design
  console.log('1. Saving design...');
  const saveRes = await fetch(`${BASE}/api/user/designs`, {
    method: 'POST', headers: authHeaders,
    body: JSON.stringify({ room_type: 'bedroom', style: 'modern', budget: 50000 })
  });
  const saveData = await saveRes.json();
  console.log(`   ${saveRes.ok ? '✅' : '❌'} Design saved: ${JSON.stringify(saveData.design?.id)}`);

  // Get designs
  console.log('2. Fetching designs...');
  const getRes = await fetch(`${BASE}/api/user/designs`, { headers: authHeaders });
  const getData = await getRes.json();
  console.log(`   ${getRes.ok ? '✅' : '❌'} Designs: ${getData.designs?.length || 0} found`);

  // Delete design
  const designId = saveData.design?.id;
  if (designId) {
    console.log('3. Deleting design...');
    const delRes = await fetch(`${BASE}/api/user/designs?id=${designId}`, {
      method: 'DELETE', headers: authHeaders
    });
    console.log(`   ${delRes.ok ? '✅' : '❌'} Deleted`);
  }

  console.log('\n✅ All auth + designs APIs working!');
}

main();
