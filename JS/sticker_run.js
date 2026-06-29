const boneco = document.querySelector(".boneco");
const spike = document.querySelector(".espinho");
let titulo = document.querySelectorAll('.texto h1');
let subtitulo = document.querySelectorAll('.texto h2');
let spikePosition;
let bonecoPosition;
let lose;

spike.style.animation = 'none';
boneco.style.animation = 'none';

function iniciar(start) {
    if (start.key === ' ' || start.key === 'Spacebar') {
        spike.style.animation = '';
        boneco.style.animation = '';

        titulo.textContent = '';
        subtitulo.textContent = '';
    }
}

document.addEventListener('keydown', iniciar)

const jump = (event) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (boneco.classList.contains('jump')) {
            return;
        }    
        boneco.classList.add("jump");
    }
    setTimeout(() => {
        boneco.classList.remove("jump");
    }, 500);
};

document.addEventListener("keydown", jump);


const colisao = () => {
    spikePosition = spike.offsetLeft;
    bonecoPosition = +getComputedStyle(boneco).bottom.replace('px', '');
    
    if (spikePosition <= 238 && spikePosition > 150 && bonecoPosition < 64) {
        spike.style.animation = 'none';
        spike.style.left = `${spikePosition}px`;
        
        boneco.style.animation = 'none';
        boneco.style.bottom = `${bonecoPosition}px`;
        boneco.src = '../Assets/IMG/game-over.gif';
        
        titulo = document.querySelector('.texto h1');
        subtitulo = document.querySelector('.texto h2');
        
        if (titulo) titulo.textContent = 'GAME OVER'
        if (subtitulo) subtitulo.textContent = 'Você perdeu. Tente novamente: Pressione R para reiniciar'
        
        clearInterval(lose);
    }
};

lose = setInterval(colisao, 10);

const restart = (reset) => {
    if (reset.key === 'r' || reset.key === 'R') {
        spike.style.left = '';
        boneco.style.bottom = '';
        
        spike.style.animation = '';
        boneco.style.animation = '';

        titulo = document.querySelector('.texto h1');
        subtitulo = document.querySelector('.texto h2');
        
        if (titulo) titulo.textContent = ''
        if (subtitulo) subtitulo.textContent = ''

        boneco.src = '../Assets/IMG/boneco.gif'

        clearInterval(lose)
        lose = setInterval(colisao, 10)
    }
}

document.addEventListener("keydown", restart);