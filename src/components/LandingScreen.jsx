import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Fireworks from './Fireworks';
import AnimatedEidTitle from './AnimatedEidTitle';
import './LandingScreen.css';
import { playFireworks, stopFireworks } from '../utils/fireworksSound';

const playSound = (path, volume = 0.7) => {
  try {
    const audio = new Audio(path);
    audio.volume = volume;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // ignore autoplay / format errors
      });
    }
  } catch {
    // ignore
  }
};

export default function LandingScreen({ onOpenGift, followerCount = 0 }) {
  // Play fireworks sound when the site opens on the fireworks hero
  useEffect(() => {
    playFireworks(0.6);
    return () => {
      stopFireworks();
    };
  }, []);

  const handleOpenGift = () => {
    // Stop fireworks when transitioning to the wizard
    stopFireworks();
    playSound('/click.mp3', 0.8);
    playSound('/magic.mp3', 0.5);
    onOpenGift();
  };

  return (
    <div className="landing-screen">
      <Fireworks />
      <motion.div
        className="landing-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <AnimatedEidTitle text="كل عام وانتم بالف خير" />
        <motion.p
          className="eid-subtitle"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
        >
          رغم بعد المسافات وقلة الحيلة الا انني لا احب قضاء مناسبة دون استشعار وجودكم فيها
        </motion.p>
        <motion.div
          className="gift-button-wrap gift-button-wrap-flower-border"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="flower flower-tl" aria-hidden>🌸</span>
          <span className="flower flower-tc" aria-hidden>🌺</span>
          <span className="flower flower-tr" aria-hidden>🌷</span>
          <span className="flower flower-tr2" aria-hidden>🌷</span>
          <span className="flower flower-bl" aria-hidden>🌸</span>
          <span className="flower flower-bc" aria-hidden>🌼</span>
          <span className="flower flower-br" aria-hidden>🌸</span>
          <span className="flower flower-br2" aria-hidden>🌺</span>
          <span className="flower flower-left" aria-hidden>🌷</span>
          <span className="flower flower-left2" aria-hidden>🌷</span>
          <span className="flower flower-right" aria-hidden>🌸</span>
          <span className="flower flower-right2" aria-hidden>🌼</span>
          <motion.button
            className="gift-button"
            onClick={handleOpenGift}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="gift-button-text">اضغطي علي لمعرفة هديتي الخاصة بكما</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
