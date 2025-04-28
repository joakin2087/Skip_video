// Salteador de video introduciendo la url,cambia de video sumandole 1 al episodio modificando url   

// Referencias a los elementos del DOM

const modal = document.getElementById('confirmationModal');
const timeDisplay = document.getElementById('timeLeftDisplay');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const countdownProgress = document.getElementById('countdownProgress');

let countdownInterval;

const btn = document.getElementById('btn');
let videoUrl =document.getElementById('videoSource');
document.getElementById('videoSource').src = videoUrl;
document.getElementById('miVideo').load();
    
function pideUrl () {
         videoUrl = prompt("Ingrese la dirección del video:");
          document.getElementById('videoSource').src = videoUrl;
          document.getElementById('miVideo').load();
        }     
         
  
function redirect() {
    
   
    const newUrl = videoUrl.replace(/t22_e(\d+)/, (match, num) => `t22_e${String(parseInt(num) + 1).padStart(2, '0')}`);
    document.getElementById('videoSource').src= newUrl;
    videoUrl= newUrl;
    document.getElementById('miVideo').load();
    
  }

  const video = document.getElementById('miVideo');

  video.addEventListener('ended', () => {
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