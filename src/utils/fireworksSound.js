let fireworksAudio;

export function playFireworks(volume = 0.7) {
  try {
    if (!fireworksAudio) {
      fireworksAudio = new Audio('/fireworks.mp3');
      fireworksAudio.loop = true;
    }
    fireworksAudio.volume = volume;
    const playPromise = fireworksAudio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // ignore autoplay / format errors
      });
    }
  } catch {
    // ignore if audio fails
  }
}

export function stopFireworks() {
  try {
    if (!fireworksAudio) return;
    fireworksAudio.pause();
    fireworksAudio.currentTime = 0;
  } catch {
    // ignore if audio fails
  }
}

