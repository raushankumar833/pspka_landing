import { Stack, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const HomeUserCounter: React.FC<{
  countTo: number;
  duration: number;
  unit?: string;
  color?: string;
  subValue?: string;
}> = ({ countTo, duration, unit, color = '#000', subValue = '' }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // You can adjust the threshold as per your requirement
    );

    observer.observe(counter);

    return () => {
      if (counter) {
        observer.unobserve(counter);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let counterValue = 1;
      const updateCounter = () => {
        const step = Math.floor(counterValue);
        if (counterRef.current) {
          counterRef.current.innerText = step.toString();
        }
        counterValue += countTo / (duration / 14);
        if (counterValue <= countTo) {
          requestAnimationFrame(updateCounter);
        } else {
          if (counterRef.current) {
            counterRef.current.innerText = countTo.toString();
          }
        }
      };
      updateCounter();
    }
  }, [isVisible, countTo, duration]);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        color: color,
      }}
    >
      <Stack flexDirection="row" alignItems="center">
        <Typography variant="h2" fontWeight="normal" className="counter" ref={counterRef}>
          0
        </Typography>
        <Typography variant="h2" fontWeight="normal">
          {unit ? unit : ''}
        </Typography>
      </Stack>
      <Typography
        variant="h4"
        fontWeight="normal"
        sx={{
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
        }}
      >
        {subValue}
      </Typography>
    </Stack>
  );
};

export default HomeUserCounter;
