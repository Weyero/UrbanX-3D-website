import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function OverlayUI() {

  const group1Refs = useRef([]);
  const group2Refs = useRef([]);
  const group3Refs = useRef([]);
  const group4Refs = useRef([]);
  
  useEffect(() => {

    const updateOpacity = () => {
      const scrollOffset = window.__SCROLL_OFFSET__ || 0;

      // Группа 1 - Исчезает в диапазоне 0 - 0.1
      const minScroll1 = 0.0;
      const maxScroll1 = 0.1;
      const opacity1 = 1 - Math.max(0, Math.min((scrollOffset - minScroll1) / (maxScroll1 - minScroll1), 1));

      group1Refs.current.forEach((el) => {
        if (el) el.style.opacity = opacity1.toFixed(2);
      });

      // Группа 2 - Появляется в 0.11 - 0.2 и исчезает 0.2 до 0.35
      const minAppear = 0.11;
      const maxAppear = 0.2;
      const appearOpacity = Math.max(0, Math.min((scrollOffset - minAppear) / (maxAppear - minAppear), 1));
      const minDisappear = 0.2;
      const maxDisappear = 0.35;
      const disappearOpacity = 1 - Math.max(0, Math.min((scrollOffset - minDisappear) / (maxDisappear - minDisappear), 1));
      const finalOpacity = Math.min(appearOpacity, disappearOpacity); // Объединяем два эффекта

      group2Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity.toFixed(2);
      });


      // Группа 3
      const minAppear3 = 0.36;
      const maxAppear3 = 0.5;
      const appearOpacity3 = Math.max(0, Math.min((scrollOffset - minAppear3) / (maxAppear3 - minAppear3), 1));
      const minDisappear3 = 0.7;
      const maxDisappear3 = 0.78;
      const disappearOpacity3 = 1 - Math.max(0, Math.min((scrollOffset - minDisappear3) / (maxDisappear3 - minDisappear3), 1));
      const finalOpacity3 = Math.min(appearOpacity3, disappearOpacity3);

      group3Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity3.toFixed(2);
      });


      // Группа 4 (только появление)
      const minAppear4 = 0.8;
      const maxAppear4 = 0.92;
      const appearOpacity4 = Math.max(0, Math.min((scrollOffset - minAppear4) / (maxAppear4 - minAppear4), 1));

      group4Refs.current.forEach((el) => {
        if (el) el.style.opacity = appearOpacity4.toFixed(2);
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

        {/* Группа 1 - Исчезает только */}

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

          <div style={{
              position: 'absolute',
              top: '-60px',
              left: '80px',
              fontFamily: 'Roboto Flex, sans-serif',
              fontSize: '120px',
              fontWeight: '400',
              color: '#FA570C',
              textAlign: 'left',
              maxWidth: '900px'
            }}>
            <p ref={(el) => group3Refs.current[0] = el} style={{ 
              }}>
                Разработано для
              </p>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-60px',
              right: '80px',
              fontFamily: 'Roboto Flex, sans-serif',
              fontSize: '120px',
              fontWeight: '400',
              color: 'white',
              textAlign: 'left'
            }}>
              <p ref={(el) => group3Refs.current[1] = el} style={{ 
              }}>
                Сирена
              </p>
            </div>




            {/* Текст над кнопкой */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -300px)', // Центрируем + сдвигаем вверх
              textAlign: 'center'
            }}>
              {/* Текст над кнопкой */}
              <p ref={(el) => group4Refs.current[0] = el} style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#C5C5C5',
                marginBottom: '10px'
              }}>
                DLC контент, кликай
              </p>

              {/* Кнопка */}
              <a ref={(el) => group4Refs.current[1] = el} href="https://google.com" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button ref={(el) => group4Refs.current[2] = el} style={{
                  width: '246px',
                  height: '64px',
                  backgroundColor: 'white',
                  color: '#FA570C',
                  fontSize: '24px',
                  fontWeight: '700',
                  textAlign: 'center',
                  border: 'none',
                  borderRadius: '32px',
                  cursor: 'pointer'
                }}>
                  Бонус!
                </button>
              </a>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '95px', 
              right: '325px',
              textAlign: 'left'
            }}>
              {/* Основной текст */}
              <p ref={(el) => group4Refs.current[3] = el} style={{ 
                fontSize: '40px', 
                fontWeight: '400', 
                fontFamily: 'Roboto Flex',
                color: 'white',
                letterSpacing: '-2px',
                maxWidth: '600px'
              }}>
                Сайт создан в рамках тестового задания для студии Сирена
              </p>

              {/* Ссылка */}
              <a ref={(el) => group4Refs.current[4] = el} href="https://t.me/la3dno" target="_blank" rel="noopener noreferrer"
                style={{ 
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: 'Roboto Flex',
                  color: '#FA570C',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px' /* Отступ между текстом и стрелкой */
                }}>
                Ссылка для связи со мной
                <span ref={(el) => group4Refs.current[5] = el} style={{ fontSize: '18px' }}>↗</span> {/* Стрелка */}
              </a>
            </div>


            {/* Таблица слева внизу */}
            <div style={{
              position: 'absolute',
              bottom: '80px',
              left: '80px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '30px',
              fontFamily: 'Roboto Flex, sans-serif'
            }}>
              {/* Ячейка 1 */}
              <div>
                <p ref={(el) => group4Refs.current[6] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>прототип и референсы</p>
                <p ref={(el) => group4Refs.current[7] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Figma</p>
              </div>

              {/* Ячейка 2 */}
              <div>
                <p ref={(el) => group4Refs.current[8] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>3D</p>
                <p ref={(el) => group4Refs.current[9] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Blender</p>
              </div>

              {/* Ячейка 3 */}
              <div>
                <p ref={(el) => group4Refs.current[10] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>сборка сайта</p>
                <p ref={(el) => group4Refs.current[11] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>React</p>
              </div>

              {/* Ячейка 4 */}
              <div>
                <p ref={(el) => group4Refs.current[12] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>3D to Web</p>
                <p ref={(el) => group4Refs.current[13] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Three JS</p>
              </div>
            </div>

    </div>
  );
}