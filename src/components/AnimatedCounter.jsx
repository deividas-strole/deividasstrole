import { useEffect, useRef, useState } from "react";
import { counterItems } from "../constants";

// Single reusable component
const AnimatedText = ({ text, delay, className }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const letters = text.split("");

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setVisibleLetters(currentIndex);

        if (currentIndex > letters.length) {
          clearInterval(interval);
        }
      }, 50);

      // Properly clean up both timer and interval
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, letters.length, delay]);

  return (
      <div ref={ref} className={className}>
        {letters.map((letter, index) => (
            <span
                key={`${text}-${index}`}
                style={{
                  opacity: index < visibleLetters ? 1 : 0,
                  transition: "opacity 0.1s ease-in-out",
                }}
            >
          {letter}
        </span>
        ))}
      </div>
  );
};

const AnimatedCounter = () => {
  return (
      <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
        <div className="mx-auto grid-4-cols">
          {counterItems.map((item, index) => (
              <div
                  key={index}
                  className="bg-zinc-900 rounded-lg p-9 flex flex-col justify-center"
              >
                <AnimatedText
                    text={item.label}
                    delay={index * 200}
                    className="text-white text-2xl font-semibold"
                />
                <AnimatedText
                    text={item.school}
                    delay={index * 200 + item.label.length * 50}
                    className="text-blue-300 text-lg font-medium mt-2"
                />
              </div>
          ))}
        </div>
      </div>
  );
};

export default AnimatedCounter;