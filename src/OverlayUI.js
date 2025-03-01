import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function OverlayUI() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current, {
      opacity: 0,
      y: -230,
    }, {
      opacity: 1,
      y: -250,
      duration: 1.5,
      ease: 'power2.out'
    });

    gsap.to(textRef.current, {
      textShadow: '2px 2px 0px red, -2px -2px 0px blue',
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <div>
      <div className="grain-overlay"></div>

      {/* Контейнер UI */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        
        {/* Крупная надпись в центре */}
        <div ref={textRef} style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '400px',
          maxWidth: '100vw',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          opacity: 0
        }}>
          URBAN X
        </div>

        {/* Блок с нижними текстами */}
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '100px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'Manrope, sans-serif',
          color: 'white'
        }}>
          {/* Левая надпись */}
          <p style={{ fontSize: '16px', fontWeight: '400', marginRight: '100px' }}>
            Прокрутите вниз, чтобы исследовать
          </p>

          {/* Правая надпись + ссылка "Подробнее" */}
          <div style={{ textAlign: 'left', marginLeft: '200px', maxWidth: '750px' }}>
            <p style={{ fontSize: '30px', fontWeight: '400', marginBottom: '8px' }}>
              Инновационный дизайн встречает передовые технологии. Двигайтесь умнее, чище и дальше.
            </p>
            <p style={{ fontSize: '16px', fontWeight: '500', color: '#ff4000', cursor: 'pointer' }}>
              Подробнее
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}