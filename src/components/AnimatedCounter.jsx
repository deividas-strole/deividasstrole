import { useEffect, useRef, useState } from "react";
import { counterItems } from "../constants";

const AnimatedLabel = ({ label, delay }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

    const letters = label.split("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= letters.length) {
        setVisibleLetters(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // 0.2 second delay between letters

    return () => clearInterval(interval);
  }, [isVisible, label]);

  const letters = label.split("");

  return (

      // mt-2

      <div ref={ref} className="text-white text-2xl font-semibold">
        {letters.map((letter, index) => (
            <span
                key={index}
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
                  className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
              >
                <AnimatedLabel label={item.label} delay={index * 200} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default AnimatedCounter;