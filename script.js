const envelope = document.getElementById('envelope');
const music = document.getElementById('background-music');

// Play from 1:47 to 2:47
const startTime = 107; // seconds
const endTime = 167;   // seconds

function playSegment() {
  music.currentTime = startTime;
  music.volume = 0.3; // ✅ reduce volume to 30%

  music.play().then(() => {
    console.log("Music playback started at reduced volume.");
  }).catch(e => {
    console.error("Playback failed:", e);
    alert("Playback was blocked. Try clicking again.");
  });

  const checkTime = () => {
    if (music.currentTime >= endTime) {
      music.pause();
      music.removeEventListener('timeupdate', checkTime);
    }
  };

  music.addEventListener('timeupdate', checkTime);
}

envelope.addEventListener('click', (event) => {
  console.log("Envelope clicked.");

  if (!envelope.classList.contains('open')) {
    // Play music segment on open
    playSegment();

    // Particle animation
    const heart = envelope.querySelector('.heart');
    const rect = envelope.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    heart.classList.add('hide');

    const colors = ['#c3b1e1', '#d8bfd8', '#e6e6fa', '#b39ddb'];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('heart-particle');
      particle.style.setProperty('--x', Math.random() * 2 - 1);
      particle.style.setProperty('--y', Math.random() * 2 - 1);
      particle.style.setProperty('--r', Math.random());
      particle.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
      particle.style.top = `${clickY}px`;
      particle.style.left = `${clickX}px`;
      envelope.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }

    envelope.classList.add('open');

    // Show heart again after animation
    setTimeout(() => {
      heart.classList.remove('hide');
    }, 800);

  } else {
    // Close envelope and pause music
    music.pause();
    envelope.classList.remove('open');
  }
});
