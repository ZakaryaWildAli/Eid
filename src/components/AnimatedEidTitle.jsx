import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedEidTitle({ text = 'كل عام وانتما بخير' }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.eid-word');
      gsap.fromTo(
        words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          stagger: 0.12,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <h1 ref={rootRef} className="eid-title eid-title-bits">
      {words.map((word, index) => (
        <span key={index} className="eid-word">
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </h1>
  );
}
