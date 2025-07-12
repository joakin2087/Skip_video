// Salteador de video introduciendo la url,cambia de video sumandole 1 al episodio modificando url   

// Referencias a los elementos del DOM

const modal = document.getElementById('confirmationModal');
const timeDisplay = document.getElementById('timeLeftDisplay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const video = document.getElementById('miVideo');
const countdownProgress = document.getElementById('countdownProgress');

let countdownInterval;

const btn = document.getElementById('btn');
let videoUrl =document.getElementById('videoSource');
document.getElementById('videoSource').src = videoUrl;
document.getElementById('miVideo').load();

let modificaUrl = '';

// Escapa caracteres especiales para usar como literal en la RegExp
function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Pide URL y sección
function pideUrl() {
  videoUrl = prompt("Ingrese la URL del video:");
  modificaUrl = prompt("Prefijo a incrementar (p.ej. 't24_e'):");
  document.getElementById('videoSource').src = videoUrl;
  video.load();
}

// Incrementa el episodio en la URL
function redirect() {
  const prefixEscaped = escapeForRegex(modificaUrl);
  const regex = new RegExp(`${prefixEscaped}(\\d+)`);
  const newUrl = videoUrl.replace(regex, (match, num) => {
    const nextNum = String(parseInt(num, 10) + 1).padStart(num.length, '0');
    return `${modificaUrl}${nextNum}`;
  });
  videoUrl = newUrl;
  document.getElementById('videoSource').src = newUrl;
  video.load();
}
  
// funcion para cambiar full screen 

function toggleFullscreen(element) {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
}

// Evento para finalización del video

  video.addEventListener('ended', () => {
    toggleFullscreen();
    let timeLeft = 10;
    const totalSeconds = 10;
    timeDisplay.innerText = timeLeft;
    countdownProgress.style.width = '100%';
    modal.classList.add('active');

    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
        timeDisplay.innerText = timeLeft;
        // Actualiza la barra de progreso de acuerdo al tiempo restante.
        const progressPercent = (timeLeft / totalSeconds) * 100;
        countdownProgress.style.width = progressPercent + '%';
      }
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        modal.classList.remove('active');
        redirect();
      }
    }, 1000);
  });

  // Si el usuario hace clic en "Confirmar"
  confirmBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    modal.classList.remove('active');
    redirect();
  });

  // Si el usuario hace clic en "Cancelar"
  cancelBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    modal.classList.remove('active');
    // Aquí puedes decidir si no hacer nada o ejecutar otra acción.
  });

  // Solicitar la dirección del video al cargar la página
btn.onclick = pideUrl;