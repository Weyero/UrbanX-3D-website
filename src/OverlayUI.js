import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function OverlayUI() {
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
          fontFamily: 'Manrope, sans-serif',
          color: 'white'
        }}>
          {/* Левая надпись */}
          <p style={{ 
            fontSize: '16px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '80px',
            left: '290px',
            fontFamily: 'Roboto Flex, sans-serif',
            color: '#C5C5C5',
            textAlign: 'left',
            maxWidth: '280px'
          }}>
            Прокрутите страницу вниз, чтобы ознакомиться с возможностями.
          </p>

          {/* Правая надпись */}
          <p style={{ 
            fontSize: '40px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '15px',
            left: '650px',
            fontFamily: 'Roboto Flex, sans-serif',
            color: 'white',
            letterSpacing: '-2px',
            textAlign: 'left',
            maxWidth: '978px'
          }}>
            Инновационный дизайн встречает передовые технологии. Двигайтесь умнее, чище и дальше.
          </p>
          
          {/* Маленькая надпись под правым текстом */}
          <p style={{ 
            fontSize: '16px', 
            fontWeight: '400', 
            position: 'absolute',
            bottom: '-10px', // Чуть ниже правого текста
            left: '650px',
            fontFamily: 'Roboto Flex, sans-serif',
            color: '#FA570C',
            textAlign: 'left',
            maxWidth: '150px'
          }}>
            Подробнее ↓
          </p>
        </div>
      </div>
    </div>
  );
}
