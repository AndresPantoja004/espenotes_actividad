// Declaración de variables globales
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let FORM_POST;
let deferredPrompt;

// Funciones
const showPostModal = () => {
  console.log("click modal abierto");
  MAIN.style.display = 'none';
  MODAL_POST.style.display = 'block';
  setTimeout(() => {
    MODAL_POST.style.transform = 'translateY(0)';
  }, 1);
};

const closePostModal = () => {
  MAIN.style.display = 'block';
  setTimeout(() => {
    MODAL_POST.style.transform = 'translateY(100vh)';
  }, 1);
};

// Guardar nota en localStorage
const saveNote = (title, description) => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title, description, date: new Date().toISOString() });
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
};

// Renderizar notas guardadas
const renderNotes = () => {
  const container = document.querySelector("#main");
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.length != 0) {
    container.innerHTML = ""; // limpiar
  }

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "mdl-card mdl-shadow--2dp";
    card.style.margin = "10px";
    card.innerHTML = `
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">${note.title}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        ${note.description}
        <br><small>${new Date(note.date).toLocaleString()}</small>
      </div>
    `;
    container.appendChild(card);
  });
};

// Instalar PWA
window.addEventListener("beforeinstallprompt", (e) => {
  console.log("Evento de install prevenido");
  e.preventDefault();
  deferredPrompt = e;
});

// Cargar todo al iniciar
window.addEventListener("load", async () => {
  MAIN = document.querySelector('#main');
  MODAL_POST = document.querySelector('#modal-post-section');
  BTN_SHOW_POST = document.querySelector('#btn-show-modal');
  BTN_CANCEL_POST = document.querySelector('#btn-post-cancel');
  FORM_POST = document.querySelector("form");

  BTN_SHOW_POST.addEventListener('click', showPostModal);
  BTN_CANCEL_POST.addEventListener('click', closePostModal);

  FORM_POST.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const description = document.querySelector("#description").value.trim();
    if (title && description) {
      saveNote(title, description);
      FORM_POST.reset();
      closePostModal();
    }
  });

  // Registrar SW
  if (navigator.serviceWorker) {
    try {
      const res = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado correctamente", res);
    } catch (err) {
      console.error("Ocurrió un error en el registro del service worker", err);
    }
  }

  // Renderizar notas al iniciar
  renderNotes();
});

// Botón para instalar app
window.addEventListener('load', async () => {
  const bannerInstall = document.querySelector("#banner-install");
  bannerInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const res = await deferredPrompt.userChoice;
      if (res.outcome == 'accepted') {
        console.log("Usuario aceptó la instalación del prompt");
      } else {
        console.log('Rechazó la instalación');
      }
    }
  });
});
