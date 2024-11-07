document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    console.log('Attempting login with:', { username, password });
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      console.log('Login Response:', result);
  
      if (response.ok) {
        alert(result.message);
        window.location.href = '/home';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });
  
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    console.log('Attempting signup with:', { username, email, password });
  
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      const result = await response.json();
      console.log('Signup Response:', result);
  
      if (response.ok) {
        alert(result.message);
        window.location.href = '/login.html';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  });
  