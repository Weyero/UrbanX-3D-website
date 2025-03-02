import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function OverlayUI() {

  const group1Refs = useRef([]); // Исчезает в 0 - 0.125
  const group2Refs = useRef([]); // Появляется в 0.125 - 0.23, исчезает в 0.23 - 0.35
  
  useEffect(() => {
    const updateOpacity = () => {
      const scrollOffset = window.__SCROLL_OFFSET__ || 0;

      // 1️⃣ Группа 1 - Исчезает в диапазоне 0 - 0.125
      const minScroll1 = 0.0;
      const maxScroll1 = 0.125;
      const opacity1 = 1 - Math.max(0, Math.min((scrollOffset - minScroll1) / (maxScroll1 - minScroll1), 1));

      group1Refs.current.forEach((el) => {
        if (el) el.style.opacity = opacity1.toFixed(2);
      });

      // 2️⃣ Группа 2 - Появляется в 0.125 - 0.23
      const minAppear = 0.125;
      const maxAppear = 0.23;
      const appearOpacity = Math.max(0, Math.min((scrollOffset - minAppear) / (maxAppear - minAppear), 1));

      // 3️⃣ Группа 2 - Исчезает в 0.23 - 0.35
      const minDisappear = 0.23;
      const maxDisappear = 0.45;
      const disappearOpacity = 1 - Math.max(0, Math.min((scrollOffset - minDisappear) / (maxDisappear - minDisappear), 1));

      const finalOpacity = Math.min(appearOpacity, disappearOpacity); // Объединяем два эффекта

      group2Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity.toFixed(2);
      });

      requestAnimationFrame(updateOpacity);
    };

    updateOpacity();
  }, []);

  return (
    <div>
      {/* Контейнер UI */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        
        {/* Блок с нижними текстами */}
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '100px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'Roboto Flex',
          color: 'white'
        }}>

        {/* Группа 1 - Исчезает (0 - 0.125) */}

          {/* Левая надпись */}
          <p ref={(el) => group1Refs.current[0] = el} style={{ 
            fontSize: '16px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '80px',
            left: '290px',
            fontFamily: 'Roboto Flex',
            color: '#C5C5C5',
            textAlign: 'left',
            maxWidth: '280px'
          }}>
            Прокрутите страницу вниз, чтобы ознакомиться с возможностями.
          </p>

          {/* Правая надпись */}
          <p ref={(el) => group1Refs.current[1] = el} style={{ 
            fontSize: '40px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '15px',
            left: '650px',
            fontFamily: 'Roboto Flex',
            color: 'white',
            letterSpacing: '-2px',
            textAlign: 'left',
            maxWidth: '978px'
          }}>
            Инновационный дизайн встречает передовые технологии. Двигайтесь умнее, чище и дальше.
          </p>
          
          {/* Маленькая надпись под правым текстом */}
          <p ref={(el) => group1Refs.current[2] = el} style={{ 
            fontSize: '16px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '-10px', // Чуть ниже правого текста
            left: '650px',
            fontFamily: 'Roboto Flex',
            color: '#FA570C',
            textAlign: 'left',
            maxWidth: '150px'
          }}>
            Подробнее ↓
          </p>
        </div>
      </div>

          <div style={{
            position: 'absolute',
            top: '50%',
            right: '155px',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            fontFamily: 'Roboto Flex, sans-serif',
            color: 'white'
          }}>
            {/* Первый блок */}
            <div style={{ marginBottom: '40px' }}> {/* Отступ между блоками */}
              <p ref={(el) => group2Refs.current[0] = el} style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#C5C5C5',
                margin: '0',
                textAlign: 'left'
              }}>
                0-100 км/ч
              </p>
              <p ref={(el) => group2Refs.current[1] = el} style={{
                fontSize: '80px',
                fontWeight: '700',
                color: 'white',
                margin: '0',
                textAlign: 'left'
              }}>
                3.9 сек
              </p>
            </div>

            {/* Второй блок */}
            <div>
              <p ref={(el) => group2Refs.current[2] = el} style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#C5C5C5',
                margin: '0',
                textAlign: 'left'
              }}>
                мощность до
              </p>
              <p ref={(el) => group2Refs.current[3] = el} style={{
                fontSize: '80px',
                fontWeight: '700',
                color: 'white',
                margin: '0',
                textAlign: 'left'
              }}>
                389 л.с.
              </p>

              <p ref={(el) => group2Refs.current[4] = el} style={{ 
                fontSize: '16px', 
                fontWeight: '400', 
                color: '#FA570C',
                textAlign: 'left',
              }}>
                Читать далее ↓
              </p>
            </div>
          </div>

    </div>
  );
}