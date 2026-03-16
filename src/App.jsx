import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import GiftScreen from './components/GiftScreen';
import './App.css';

const FOLLOWER_COUNT = 0; // Change to your followers count or fetch from API

export default function App() {
  const [showGift, setShowGift] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!showGift ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingScreen
              onOpenGift={() => setShowGift(true)}
              followerCount={FOLLOWER_COUNT}
            />
          </motion.div>
        ) : (
          <motion.div
            key="gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GiftScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
