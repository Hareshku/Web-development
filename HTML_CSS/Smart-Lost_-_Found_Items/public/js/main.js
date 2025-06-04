// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (token) {
    // Show user-only elements
    document.querySelectorAll('.auth-user').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.auth-guest').forEach(el => el.classList.add('hidden'));
    
    // Show admin elements if admin
    if (isAdmin) {
      document.querySelectorAll('.auth-admin').forEach(el => el.classList.remove('hidden'));
    }
  } else {
    // Show guest-only elements
    document.querySelectorAll('.auth-user').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.auth-guest').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.auth-admin').forEach(el => el.classList.add('hidden'));
  }
}

// Logout functionality
function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const token = localStorage.getItem('token');
      
      fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        window.location.href = '/';
      })
      .catch(error => console.error('Error:', error));
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  setupLogout();
});
