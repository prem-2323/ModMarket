(async () => {
  try {
    const signupRes = await fetch('http://localhost:5001/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Test User', username: 'testuser123', email: 'testuser123@example.com', password: 'TestPass123!', accountType: 'creator' }),
    });
    const signupBody = await signupRes.json();
    console.log('SIGNUP', signupRes.status, signupBody);

    const signinRes = await fetch('http://localhost:5001/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser123@example.com', password: 'TestPass123!' }),
    });
    const signinBody = await signinRes.json();
    console.log('SIGNIN', signinRes.status, signinBody);
  } catch (err) {
    console.error('ERROR', err);
  }
})();
