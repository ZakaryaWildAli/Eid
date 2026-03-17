import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';
import confetti from 'canvas-confetti';
import Fireworks from './Fireworks';
import './GiftScreen.css';
import P0 from '../assets/P0.png';
import P1 from '../assets/p1.jpg';
import P2 from '../assets/p2.png';
import P3 from '../assets/p3.png';
import P4 from '../assets/p4.png';
import V1 from '../assets/V1.mp4';
import V2 from '../assets/V2.mp4';
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
    // ignore if audio fails
  }
};

const GALLERY_IMAGES = [P1, P2, P3, P4];
const GALLERY_CAPTIONS = ['انتبهوا على الكتابة يلي على الصور🥺 ', 'أول عيد معًا', 'معاً بكل الحب', 'أزهار النرجس يا عمري🌼'];

function ImageGalleryStep() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (GALLERY_IMAGES.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  if (!GALLERY_IMAGES.length) return null;

  return (
    <div className="media-wrap gallery-wrap gallery-circular">
      <div className="gallery-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={GALLERY_IMAGES[index]}
            alt={`ذكرى ${index + 1}`}
            className="gallery-image gallery-image-center"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1.02, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <p className="gallery-caption" key={`cap-${index}`}>
          {GALLERY_CAPTIONS[index % GALLERY_CAPTIONS.length]}
        </p>
      </div>
      <div className="gallery-dots">
        {GALLERY_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`gallery-dot ${i === index ? 'active' : ''}`}
            onClick={() => {
              playSound('/click.mp3', 0.8);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    id: 'wizard',
    content: (
      <>
        <div className="media-wrap wizard-image-wrap">
          <img
            src={P0}
            alt="هديتكم الخاصة"
            className="gift-image"
          />
        </div>
        <p className="wizard-message">لننطلق</p>
      </>
    ),
  },
  {
    id: 'comedy1',
    content: (
      <p className="text-block comedy">عيد بدون عيدية ما بيزبط 😄</p>
    ),
  },
  {
    id: 'romantic',
    content: (
      <p className="text-block romantic">بس زكريا دائما بفكر بشيء يعوض المفقود 🥰</p>
    ),
  },
  {
    id: 'image1',
    content: (
      <ImageGalleryStep />
    ),
  },
  {
    id: 'comedy2',
    content: (
      <p className="text-block comedy">سما,مش تروحي تصرفيها ع الاندومي😒 . خالتي الموضوع عندك🥰</p>
    ),
  },
  {
    id: 'comedy3',
    content: (
      <p className="text-block comedy">ولا اقلك سماااا اعطي العيدية لامك تخبيلك ياها 🤗</p>
    ),
  },
  {
    id: 'warm1',
    content: (
      <p className="text-block warm">
      شوفي كيف خالتي ام محمد بدها تخبيلك عيديتي 🤭
            </p>
    ),
  },
  {
    id: 'video',
    content: (
      <div className="media-wrap video-wrap">
        <video
          className="gift-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={V1}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 'expensive',
    content: (
      <p className="text-block expensive">مجرد مزحة يا حلوين انتو  .ما شاء الله عنكم 🙏</p>
    ),
  },
  {
    id: 'expensive1',
    content: (
      <p className="text-block expensive">اصلا انتو هيك حتعملوا لانها من عزيز قلب الى عزيزة قلب🤍</p>
    ),
  },
  
  {
    id: 'video2',
    content: (
      <div className="media-wrap video-wrap1">
        <video
          className="gift-video1"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={V2}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    ),
  },
  {
    id: 'warm',
    content: (
      <p className="text-block warm">
        <strong className="family">الى عائلتي المستقبلية باذن الله</strong>
        صح الموضوع رمزي ومش حقيقي ولكن نابع من القلب ولو الوضع احسن من هيك الا كان الموضوع حقيقي مش مجرد حكي ولكن حسابات البنوك مراقبه وما بدي اخاطر بشغله تكون ف المستقبل لا سمح الله سبب في عدم اجتماعنا🤍 
      </p>
    ),
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export default function GiftScreen() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Soft magic sound when the wizard starts
    playSound('/magic.mp3', 0.4);

    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fff', '#ffd700', '#ffb6c1'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fff', '#ffd700', '#ffb6c1'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    const t = setTimeout(frame, 300);
    return () => clearTimeout(t);
  }, []);

  const totalSteps = STEPS.length;
  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;

  const goNext = () => {
    playSound('/click.mp3', 0.8);
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const goBack = () => {
    playSound('/click.mp3', 0.8);
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const resetWizard = () => {
    stopFireworks();
    setDirection(0);
    setStep(0);
    playSound('/click.mp3', 0.6);
  };

  const isLastStep = step === totalSteps - 1;

  // Play fireworks sound only while the final step (with fireworks) is visible
  useEffect(() => {
    if (isLastStep) {
      playFireworks(0.7);
    } else {
      stopFireworks();
    }
  }, [isLastStep]);

  // Ensure fireworks stop when leaving the wizard entirely
  useEffect(() => {
    return () => {
      stopFireworks();
    };
  }, []);

  return (
    <div className="gift-screen">
      <div className="hearts-bg" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="heart" style={{ '--i': i }}>♥</span>
        ))}
      </div>

      {isLastStep && (
        <div className="gift-screen-fireworks" aria-hidden>
          <Fireworks />
        </div>
      )}

      {isLastStep && (
        <div className="final-step-hearts" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="final-heart" style={{ '--fi': i }}>♥</span>
          ))}
        </div>
      )}

      <div className="gift-wizard">
        <Progress.Root
          className="wizard-progress"
          value={totalSteps > 1 ? (step / (totalSteps - 1)) * 100 : 0}
          aria-label="Gift wizard progress"
          style={{
            '--progress': totalSteps > 1 ? (step / (totalSteps - 1)) * 100 : 0,
          }}
        >
          <Progress.Indicator className="wizard-progress-indicator" />
        </Progress.Root>
        <div className="wizard-steps" role="tablist" aria-label="Gift steps">
          {STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={step === i}
              aria-label={`خطوة ${i + 1} من ${totalSteps}`}
              className={`wizard-dot ${step === i ? 'active' : ''} ${step > i ? 'done' : ''}`}
              onClick={() => {
                playSound('/click.mp3', 0.8);
                if (i === totalSteps - 1) {
                  playFireworks(0.7);
                } else {
                  stopFireworks();
                }
                setDirection(i > step ? 1 : -1);
                setStep(i);
              }}
            >
              <span className="wizard-dot-inner" />
            </button>
          ))}
        </div>

        <p className="wizard-step-label" aria-live="polite">
          خطوة {step + 1} من {totalSteps}
        </p>

        <div className={`wizard-pane ${isLastStep ? 'final-step' : ''}`}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              className="gift-section wizard-step-content"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {STEPS[step].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="wizard-nav">
          {isFirst ? (
            <motion.button
              type="button"
              className="wizard-btn wizard-btn-next"
              onClick={goNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              تقدمن خطوة
            </motion.button>
          ) : (
            <>
              <motion.button
                type="button"
                className={`wizard-btn wizard-btn-next ${isLast ? 'wizard-btn-final' : ''}`}
                onClick={goNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  isLast
                    ? {
                        scale: [1, 1.06, 1],
                        boxShadow: [
                          '0 4px 16px rgba(123, 44, 191, 0.4)',
                          '0 0 30px rgba(255, 215, 0, 0.9)',
                          '0 4px 16px rgba(123, 44, 191, 0.4)',
                        ],
                      }
                    : {}
                }
                transition={
                  isLast
                    ? { repeat: Infinity, repeatType: 'loop', duration: 1.8, ease: 'easeInOut' }
                    : {}
                }
              >
                {isLast ? 'خلصت المفاجأة 🎉🤍' : 'تقدمن خطوة'}
              </motion.button>
              <motion.button
                type="button"
                className="wizard-btn wizard-btn-back"
                onClick={goBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                التراجع خطوة
              </motion.button>
            </>
          )}
        </div>

        {isLastStep && (
          <motion.div className="wizard-restart-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <button type="button" className="wizard-btn wizard-btn-restart" onClick={resetWizard}>
              إعادة الرحلة من البداية
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
