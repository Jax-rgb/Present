const envelope = document.getElementById('envelope');
const music = document.getElementById('background-music');

const startTime = 107; // 1:47 in seconds
const endTime = 167;   // 2:47 in seconds

function playSegment() {
  music.pause(); // always stop before setting new time
  music.currentTime = startTime;

  // ✅ Set volume before play!
  music.volume = 0.3;
  console.log("Volume set to:", music.volume);

  music.play().then(() => {
    console.log("Playback started at:", music.currentTime, "volume:", music.volume);
  }).catch(e => {
    console.error("Playback failed:", e);
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
  if (!envelope.classList.contains('open')) {
    playSegment();

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
    setTimeout(() => heart.classList.remove('hide'), 800);

  } else {
    music.pause();
    envelope.classList.remove('open');
  }
});
