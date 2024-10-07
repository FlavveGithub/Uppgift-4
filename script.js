// Skapa querty layout för padsen
const pad1Layout = ['Q', 'W', 'E', 'R', 'T', 'Y', 'A', 'S', 'D', 'F', 'G', 'H'];
const pad2Layout = ['U', 'I', 'O', 'P', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B'];

// Ladda JSON filen med ljudfilerna och konvertera till rätt format
fetch('sounds.json')
    .then(response => response.json())
    .then(data => {
        const sounds = data.sounds;
        skapaDrumPad(sounds);
    })
    .catch(error => console.error('Error loading JSON:', error));

function skapaDrumPad(sounds) {
    const pad1 = document.getElementById('pad1');
    const pad2 = document.getElementById('pad2');
    const audioPlayer = document.getElementById('audio-player');
    const buttons = [];

    // skAPa pad1 button
    skapaPadButtons(pad1, pad1Layout, sounds.slice(0, 12));

    // Skapa pad2 button
    skapaPadButtons(pad2, pad2Layout, sounds.slice(12, 24));

    function skapaPadButtons(pad, layout, padSounds) {
        layout.forEach((key, index) => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = key;
            button.dataset.sound = padSounds[index];
            button.dataset.key = key;

            button.addEventListener('click', () => spelaLjud(padSounds[index]));
            pad.appendChild(button);
            buttons.push(button);
        });
    }

    // Tangentbord kontroll
    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        const button = buttons.find(btn => btn.dataset.key === key);
        if (button && !event.repeat) {
            button.classList.add('pressed');
            spelaLjud(button.dataset.sound);
        }
    });

    document.addEventListener('keyup', (event) => {
        const key = event.key.toUpperCase();
        const button = buttons.find(btn => btn.dataset.key === key);
        if (button) {
            button.classList.remove('pressed');
        }
    });

    // Byte av pads
    const padChangers = document.querySelectorAll('.pad-change');
    padChangers.forEach(changer => {
        changer.addEventListener('click', () => switchPad(changer.dataset.pad));
    });

    function spelaLjud(soundFile) {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
        audioPlayer.src = 'audio/' + soundFile;
        audioPlayer.play().catch(e => console.warn('Error playing sound:', e));
    }

    function switchPad(padId) {
        pad1.style.display = padId === 'pad1' ? 'grid' : 'none';
        pad2.style.display = padId === 'pad2' ? 'grid' : 'none';
    }

    // Visa pad1 först
    switchPad('pad1');
}