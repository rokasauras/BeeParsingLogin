document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Panel toggling
    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => container.classList.add('active'));
        loginBtn.addEventListener('click', () => container.classList.remove('active'));
    }

    // Handle sign-up form
    const signupForm = document.querySelector('.sign-up form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signupForm.querySelector('input[placeholder="Name"]').value.trim();
            const email = signupForm.querySelector('input[type="email"]').value.trim();
            const password = signupForm.querySelector('input[type="password"]').value.trim();

            console.log('📤 Registering user:', email);

            try {
                const response = await fetch('http://127.0.0.1:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('✅ ' + data.message);
                    // Optionally switch to sign-in panel
                    document.getElementById('login')?.click();
                } else {
                    alert('❌ ' + data.message);
                }
            } catch (err) {
                console.error('🚫 Registration failed:', err);
                alert('Unable to register. Is the server running?');
            }
        });
    }


    // Handle Login Form Submit
    const loginForm = document.querySelector('.sign-in form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

            console.log('📤 Attempting login with:', email);

            try {
                const response = await fetch('http://127.0.0.1:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('📥 Response:', response.status, data);

                if (response.ok) {
                    alert('🐝 ' + data.message);
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('❌ ' + data.message);
                }
            } catch (err) {
                console.error('🚫 Login request failed:', err);
                alert('Unable to connect to the server: ' + err.message);
            }
        });
    }
});
