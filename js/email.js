// email.js

// Reemplazá estos valores con los tuyos
const SERVICE_ID = "service_f52j8su";
const TEMPLATE_ID = "template_w8c1x6w";
const PUBLIC_KEY = "EzQ-qjoFbi6aNuDH8";

// Inicialización de EmailJS
emailjs.init(PUBLIC_KEY);

export function initEmailForm() {
  const form = document.getElementById("contact-form");

  if (!form) {
    console.warn("Formulario de contacto no encontrado.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        alert("Mensaje enviado con éxito 📨");
        form.reset();
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        alert("Hubo un problema al enviar el mensaje.");
      });
  });
}
