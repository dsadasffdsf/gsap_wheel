import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ReactComponent as Circle } from '../assets/Ellipse 304.svg';
// import { ReactComponent as Dot } from '../assets/Ellipse 339.svg';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Dot from './Dot';

const RADIUS = 265; // Радиус окружности

//! для tl использовать useref ,а не useState
//! проверить с другим количеством точек

const CircleGsap = ({ numberOfDots, currentPage, changePageHandler }) => {
  const containerRef = useRef(null); // Ссылка на контейнер
  const [tl, setTl] = useState(null);

  const tracker = useRef({ item: 0 });
  const [activeIndex, setActiveIndex] = useState(0); // Активная точка

  let itemStep = 1 / numberOfDots;
  gsap.registerPlugin(MotionPathPlugin);
  let wrapProgress = gsap.utils.wrap(0, 1);
  let wrapTracker = gsap.utils.wrap(0, numberOfDots);

  let snap = gsap.utils.snap(itemStep);

  useLayoutEffect(() => {
    const dotsArray = containerRef.current.querySelectorAll('.dot');

    let tl = gsap.timeline({ paused: true });
    tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const progress = tl.progress();
        const currentIndex = wrapTracker(
          Math.round(progress * numberOfDots), // Переводим прогресс в индекс
        );
        tracker.current.item = currentIndex; // Синхронизируем tracker
        setActiveIndex(currentIndex); // Обновляем состояние активной точки
      },
    });

    setTl(tl);

    gsap.set(dotsArray, {
      motionPath: {
        path: '#path',
        align: '#path',
        alignOrigin: [0.5, 0.5],
        end: (i) => i / dotsArray.length,
      },
      // scale: 0.9,
    });
    // Обновляем анимацию вращения
    tl.to('.wrapper', {
      rotation: 360, // Применяем новый угол
      transformOrigin: 'center',
      duration: 1,
      ease: 'none',
    });
    tl.to(
      dotsArray,
      {
        rotation: -360, // Поворачиваем точки в противоположную сторону
        transformOrigin: 'center',
        duration: 1,
        ease: 'none',
      },
      0,
    );
    tl.to(
      tracker.current,
      {
        item: numberOfDots,
        duration: 1,
        ease: 'none',
        modifiers: {
          item(value) {
            return wrapTracker(numberOfDots - Math.round(value));
          },
        },
      },
      0,
    );
  }, [numberOfDots]);

  // Функция для обновления угла при каждом клике
  const move = (index) => {
    let current = tracker.current.item;

    if (index === current) {
      return;
    }

    let diff = index - current;

    // Проверяем, нужно ли двигаться в обратную сторону
    if (Math.abs(diff) > numberOfDots / 2) {
      if (diff > 0) {
        diff = diff - numberOfDots; // Движение против часовой стрелки
      } else {
        diff = diff + numberOfDots; // Движение по часовой стрелке
      }
    }

    console.log(`Current: ${current}, Target: ${index}, Diff: ${diff}`);

    tracker.current.item = index; // Обновляем текущее значение
    handlePlay(diff * itemStep);
  };

  const handlePlay = (itemStep) => {
    gsap.to(tl, {
      progress: snap(tl.progress() + itemStep),
      modifiers: {
        progress: wrapProgress,
      },
      onComplete: () => {
        // Синхронизация после завершения анимации
        const progress = tl.progress();
        tracker.current.item = wrapTracker(Math.round(progress * numberOfDots));
      },
    });
  };
  useEffect(() => {
    if (tl) {
      move(currentPage);
    }
  }, [tl, currentPage]);
  return (
    <>
      <div
        ref={containerRef}
        style={{ width: `${RADIUS * 2}px`, height: `${RADIUS * 2}px` }}
        className="wrapper z-50 ">
        <Circle width={`${RADIUS * 2}`} height={`${RADIUS * 2}`} className="rotate-[30deg]" />
        {Array.from({ length: numberOfDots }).map((_, index) => (
          // Создаём точки с уникальными ID и классами
          <Dot
            key={index}
            id={`dot${index}`}
            index={index}
            onClick={() => changePageHandler(index)}
            activeIndex={activeIndex}
          />
        ))}
      </div>
      {/* <button type="button" className="absolute bottom-0 z-[100]" onClick={() => handlePlay(itemStep)}>
        next
      </button> */}
      {/* <button type="button" className="absolute bottom-0 z-[100]" onClick={() => move(1)}>
        next
      </button> */}
    </>
  );
};

export default CircleGsap;
