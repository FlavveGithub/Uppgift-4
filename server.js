async function laddaLjud() {
    try {
        const response = await fetch('/sounds.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        sounds = data;
        renderPads();
    } catch (error) {
        console.error('Error loading sounds:', error);
    }
}

function spelaLjud(soundFile) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = `audio/${soundFile}`; // Update this line
    audioPlayer.play();
}


laddaLjud();