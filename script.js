// DOM Elements
const curtain = document.querySelector('.gamosa-curtain');
const content = document.querySelector('.content');
const senderName = document.getElementById('senderName');
const nameInput = document.getElementById('nameInput');
const sendGreeting = document.getElementById('sendGreeting');
const whatsappShare = document.getElementById('whatsappShare');
const facebookShare = document.getElementById('facebookShare');
const floatingElements = document.getElementById('floatingElements');
const audio = document.getElementById('bgMusic');
const audioControl = document.getElementById('audioControl');

// State
let userInteracted = false;

// Initialize
createFloatingElements();

// Event Listeners
curtain.addEventListener('click', openCurtain);
sendGreeting.addEventListener('click', updateSenderName);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateSenderName();
});
audioControl.addEventListener('click', toggleAudio);

// Functions
function createFloatingElements() {
    const emojis = ['🌸', '🌺', '🍃', '✨', '🥁', '🎶'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating';
        element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = Math.random() * 100 + 'vh';
        element.style.fontSize = (Math.random() * 25 + 20) + 'px';
        element.style.animationDuration = (Math.random() * 20 + 10) + 's';
        element.style.animationDelay = (Math.random() * 5) + 's';
        floatingElements.appendChild(element);
    }
}

function openCurtain() {
    userInteracted = true;
    curtain.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        content.style.opacity = '1';
    }, 1000);
    
    playAudio();
    createConfetti();
}

function playAudio() {
    if (!userInteracted) return;
    
    audio.volume = 0.6;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            audioControl.textContent = '🔊';
        }).catch(error => {
            audioControl.textContent = '🔇';
            console.error("Audio playback failed:", error);
        });
    }
}

function toggleAudio() {
    userInteracted = true;
    if (audio.paused) {
        playAudio();
        audioControl.classList.add('animate__rubberBand');
        setTimeout(() => {
            audioControl.classList.remove('animate__rubberBand');
        }, 1000);
    } else {
        audio.pause();
        audioControl.textContent = '🔇';
    }
}

function updateSenderName() {
    const name = nameInput.value.trim();
    if (name) {
        senderName.textContent = `${name}ৰ পৰা`;
        senderName.classList.add('animate__rubberBand');
        
        setTimeout(() => {
            senderName.classList.remove('animate__rubberBand');
        }, 1000);
        
        createConfetti();
        updateShareLinks(name);
    } else {
        nameInput.classList.add('animate__shakeX');
        setTimeout(() => {
            nameInput.classList.remove('animate__shakeX');
        }, 1000);
    }
}

function updateShareLinks(name) {
    const greetingText = `ৰঙালী বিহু আৰু অসমীয়া নৱবৰ্ষৰ হিয়া ভৰা ওলগ ও শুভেচ্ছা যাঁচিলো – ${name}ৰ পৰা`;
    const pageUrl = encodeURIComponent(window.location.href);
    
    whatsappShare.href = `https://wa.me/?text=${encodeURIComponent(greetingText + '\n\n' + pageUrl)}`;
    facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodeURIComponent(greetingText)}`;
    
    whatsappShare.classList.add('animate__bounce');
    facebookShare.classList.add('animate__bounce');
    setTimeout(() => {
        whatsappShare.classList.remove('animate__bounce');
        facebookShare.classList.remove('animate__bounce');
    }, 1000);
}

function createConfetti() {
    const colors = ['#FFD700', '#E63946', '#4CAF50', '#FFFFFF', '#FF6B6B'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `fall ${animationDuration}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
