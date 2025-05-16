const email = document.getElementById('email');
const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(email.textContent).then(() => {
    console.log('Email copied to clipboard!');
    
  });
});