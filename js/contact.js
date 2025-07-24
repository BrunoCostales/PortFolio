export function contactCopy() {
     const copyIcon = document.getElementById('copyIcon');
  const emailText = document.getElementById('emailText');



    if (copyIcon && emailText) {
    copyIcon.addEventListener('click', () => {
      const email = emailText.textContent;
      console.log(navigator.clipboard);
      
      console.log(email);
      
       if (navigator.clipboard) {
        navigator.clipboard.writeText(email)
          .then(() => {
            console.log('Email copied to clipboard');
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      } else {
        // Fallback for browsers that don't support the Clipboard API
        console.warn('Clipboard API not available. Manual copy required.');
        // You could implement a different copy mechanism here,
        // for example, by selecting the text in the emailText element
        // and instructing the user to press Ctrl+C or Cmd+C.
      }
      console.log(email);
      
      
    });
  }
    
}