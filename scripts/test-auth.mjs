const BASE = 'https://ai-interior-architect-huxg4415i-urvashi-s-projects1.vercel.app';

async function main() {
  // Step 1: Check signup page loads
  console.log('1. Checking signup page loads...');
  const pageRes = await fetch(`${BASE}/auth/signup`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log(`   Status: ${pageRes.status} ${pageRes.ok ? '✅' : '❌'}`);

  // Step 2: Test signup API
  console.log('\n2. Testing signup...');
  const testEmail = `test${Date.now()}@example.com`;
  const signupRes = await fetch(`${BASE}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'testpass123', action: 'signup' })
  });
  const signupData = await signupRes.json();
  console.log(`   Status: ${signupRes.status} ${signupRes.ok ? '✅' : '❌'}`);
  console.log(`   Response: ${JSON.stringify(signupData)}`);

  if (!signupRes.ok) {
    console.log('\n❌ Signup FAILED!');
    return;
  }

  // Step 3: Check session with the cookie
  console.log('\n3. Checking session after signup...');
  const setCookie = signupRes.headers.get('set-cookie');
  console.log(`   Set-Cookie: ${setCookie ? setCookie.substring(0, 80) + '...' : 'NONE ❌'}`);

  const sessionRes = await fetch(`${BASE}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': setCookie ? setCookie.split(';')[0] : ''
    },
    body: JSON.stringify({ action: 'session' })
  });
  const sessionData = await sessionRes.json();
  console.log(`   Status: ${sessionRes.status} ${sessionRes.ok ? '✅' : '❌'}`);
  console.log(`   Session: ${JSON.stringify(sessionData)}`);

  // Step 4: Test signin
  console.log('\n4. Testing signin...');
  const signinRes = await fetch(`${BASE}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'testpass123', action: 'signin' })
  });
  const signinData = await signinRes.json();
  console.log(`   Status: ${signinRes.status} ${signinRes.ok ? '✅' : '❌'}`);
  console.log(`   Response: ${JSON.stringify(signinData)}`);

  // Step 5: Check dashboard loads
  console.log('\n5. Checking dashboard page loads...');
  const dashRes = await fetch(`${BASE}/dashboard`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log(`   Status: ${dashRes.status} ${dashRes.ok ? '✅' : '❌'}`);

  console.log('\n=== Summary ===');
  console.log(signupRes.ok && signinRes.ok ? '✅ Auth is working!' : '❌ Auth has issues');
}

main();
