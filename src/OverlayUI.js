import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function OverlayUI() {

  const group1Refs = useRef([]); // начало
  const group2Refs = useRef([]); // right side numbers
  const group3Refs = useRef([]); // разработано для студии сирена
  const group4Refs = useRef([]); // последний экран всё всё всё

  const group5Refs = useRef([]); // добавил ПРЕДпоследний экран тут

  const [isButtonActive, setIsButtonActive] = useState(false); // Храним состояние кнопки
  
  useEffect(() => {

      const updateOpacity = () => {
      const scrollOffset = window.__SCROLL_OFFSET__ || 0;

      const active = scrollOffset >= 0.9; // тру ор фолз
      setIsButtonActive((prev) => (prev !== active ? active : prev));

      // Группа 1 - Исчезает в диапазоне 0 - 0.1
      const minScroll1 = 0.0;
      const maxScroll1 = 0.1;
      const opacity1 = 1 - Math.max(0, Math.min((scrollOffset - minScroll1) / (maxScroll1 - minScroll1), 1));

      group1Refs.current.forEach((el) => {
        if (el) el.style.opacity = opacity1.toFixed(2);
      });

      // Группа 2 - Появляется в 0.11 - 0.2 и исчезает 0.2 до 0.3
      const minAppear = 0.11;
      const maxAppear = 0.2;
      const appearOpacity = Math.max(0, Math.min((scrollOffset - minAppear) / (maxAppear - minAppear), 1));
      const minDisappear = 0.2;
      const maxDisappear = 0.3;
      const disappearOpacity = 1 - Math.max(0, Math.min((scrollOffset - minDisappear) / (maxDisappear - minDisappear), 1));
      const finalOpacity = Math.min(appearOpacity, disappearOpacity); // Объединяем два эффекта

      group2Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity.toFixed(2);
      });


      // Группа 3
      const minAppear3 = 0.36;
      const maxAppear3 = 0.45;
      const appearOpacity3 = Math.max(0, Math.min((scrollOffset - minAppear3) / (maxAppear3 - minAppear3), 1));
      const minDisappear3 = 0.5;
      const maxDisappear3 = 0.6;
      const disappearOpacity3 = 1 - Math.max(0, Math.min((scrollOffset - minDisappear3) / (maxDisappear3 - minDisappear3), 1));
      const finalOpacity3 = Math.min(appearOpacity3, disappearOpacity3);

      group3Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity3.toFixed(2);
      });

      // Группа 5
      const minAppear5 = 0.68;
      const maxAppear5 = 0.75;
      const appearOpacity5 = Math.max(0, Math.min((scrollOffset - minAppear5) / (maxAppear5 - minAppear5), 1));
      const minDisappear5 = 0.78;
      const maxDisappear5 = 0.84;
      const disappearOpacity5 = 1 - Math.max(0, Math.min((scrollOffset - minDisappear5) / (maxDisappear5 - minDisappear5), 1));
      const finalOpacity5 = Math.min(appearOpacity5, disappearOpacity5);

      group5Refs.current.forEach((el) => {
        if (el) el.style.opacity = finalOpacity5.toFixed(2);
      });


      // Группа 4 - последний экран (только появление)
      const minAppear4 = 0.87;
      const maxAppear4 = 0.96;
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
          color: 'white',
          pointerEvents: 'none'
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
            maxWidth: '280px',
            pointerEvents: 'none'
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
            maxWidth: '978px',
            pointerEvents: 'none'
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
            maxWidth: '150px',
            pointerEvents: 'none'
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
            fontFamily: "Roboto Flex",
            color: 'white',
            pointerEvents: 'none'
          }}>
            {/* Первый блок */}
            <div style={{ marginBottom: '40px', pointerEvents: 'none' }}> {/* Отступ между блоками */}
              <p ref={(el) => group2Refs.current[0] = el} style={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#C5C5C5',
                margin: '0',
                textAlign: 'left',
                pointerEvents: 'none'
              }}>
                0-100 км/ч
              </p>
              <p ref={(el) => group2Refs.current[1] = el} style={{
                fontSize: '80px',
                fontWeight: '700',
                color: 'white',
                margin: '0',
                textAlign: 'left',
                pointerEvents: 'none'
              }}>
                3.9 сек
              </p>
            </div>

            {/* Второй блок */}
            <div style={{ pointerEvents: 'none' }}>
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
              fontFamily: "Roboto Flex",
              fontSize: '120px',
              fontWeight: '400',
              color: '#FA570C',
              textAlign: 'left',
              maxWidth: '900px',
              pointerEvents: 'none'
            }}>
            <p ref={(el) => group3Refs.current[0] = el} 
            style={{ lineHeight: '0.85' }}>
                Разработано для
              </p>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-60px',
              right: '80px',
              fontFamily: "Roboto Flex",
              fontSize: '120px',
              fontWeight: '400',
              color: 'white',
              textAlign: 'left',
              pointerEvents: 'none'
            }}>
              <p ref={(el) => group3Refs.current[1] = el} 
              style={{ }}>
                студии Сирена
              </p>
            </div>


            <div style={{
                position: 'absolute',
                top: '80px',
                left: '80px',
                fontFamily: "Roboto Flex",
                pointerEvents: 'none', // Отключаем взаимодействие с этим блоком
                display: 'flex', // Размещаем элементы в строку
                flexDirection: 'row', // Горизонтальное расположение
                alignItems: 'center' // Выравниваем по центру по вертикали
              }}>
                {/* Первый текст */}
                <p ref={(el) => group5Refs.current[0] = el} 
                  style={{
                    fontFamily: "Roboto Flex",
                    fontSize: '120px',
                    fontWeight: '400',
                    color: 'white',
                    maxWidth: '1000px',
                    textAlign: 'left',
                    lineHeight: '0.85',
                    margin: '0'
                  }}>
                  Полный привод обеспечивает
                </p>

                {/* Контейнер для двух следующих текстов */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Размещаем в столбец
                  marginLeft: '0px', // Отступ от первого текста
                }}>
                  {/* Второй текст (рядом с первым) */}
                  <p ref={(el) => group5Refs.current[1] = el} 
                    style={{
                      fontFamily: "Roboto Flex",
                      fontSize: '32px',
                      fontWeight: '400',
                      color: '#FA570C',
                      textAlign: 'left',
                      margin: '120px 0 0 0' // приспустил вниз - костыль ыЫЫ
                    }}>
                    непревзойденную производительность
                  </p>

                  {/* Третий текст (под вторым) */}
                  <p ref={(el) => group5Refs.current[2] = el} 
                    style={{
                      fontFamily: "Roboto Flex",
                      fontSize: '32px',
                      fontWeight: '400',
                      color: 'white',
                      textAlign: 'left',
                      margin: '5px 0 0 0' // Отступ сверху
                    }}>
                    независимо от рельефа местности.
                  </p>
                </div>
              </div>



            {/* Текст над кнопкой */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -300px)', // Центрируем + сдвигаем вверх
              textAlign: 'center',
              pointerEvents: 'none'
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
              <a 
              onClick={isButtonActive ? () => window.open('/spline', '_blank') : null}
              ref={(el) => group4Refs.current[1] = el} 
                style={{ 
                  textDecoration: 'none',
                  cursor: isButtonActive ? 'pointer' : 'auto',
                  pointerEvents: isButtonActive ? 'auto' : 'none'
                  }}
              >
                <button 
                onClick={isButtonActive ? () => window.open('/spline', '_blank') : null}
                ref={(el) => group4Refs.current[2] = el} 
                style={{
                  width: '246px',
                  height: '64px',
                  backgroundColor: 'white',
                  color: '#FA570C',
                  fontSize: '24px',
                  fontWeight: '700',
                  textAlign: 'center',
                  border: 'none',
                  borderRadius: '32px',
                  cursor: isButtonActive ? 'pointer' : 'default',
                  pointerEvents: isButtonActive ? 'auto' : 'none'
                }}>
                  Бонус!
                </button>
              </a>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '95px', 
              right: '325px',
              textAlign: 'left',
              pointerEvents: 'none'
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
              <a 
                ref={(el) => group4Refs.current[4] = el} 
                href="https://t.me/la3dno" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: 'Roboto Flex',
                  color: '#FA570C',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px', /* Отступ между текстом и стрелкой */
                  pointerEvents: isButtonActive ? 'auto' : 'none'
                }}>
                Ссылка для связи со мной
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
              fontFamily: "Roboto Flex",
              pointerEvents: 'none'
            }}>
              {/* Ячейка 1 */}
              <div style ={{ pointerEvents: 'none' }}>
                <p ref={(el) => group4Refs.current[5] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>Прототип и референсы</p>
                <p ref={(el) => group4Refs.current[6] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Figma</p>
              </div>

              {/* Ячейка 2 */}
              <div style ={{ pointerEvents: 'none' }}>
                <p ref={(el) => group4Refs.current[7] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>3D</p>
                <p ref={(el) => group4Refs.current[8] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Blender</p>
              </div>

              {/* Ячейка 3 */}
              <div style ={{ pointerEvents: 'none' }}>
                <p ref={(el) => group4Refs.current[9] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>Сборка сайта</p>
                <p ref={(el) => group4Refs.current[10] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>React</p>
              </div>

              {/* Ячейка 4 */}
              <div style ={{ pointerEvents: 'none' }}>
                <p ref={(el) => group4Refs.current[11] = el} style={{ fontSize: '16px', color: '#C5C5C5', margin: '0' }}>3D to Web</p>
                <p ref={(el) => group4Refs.current[12] = el} style={{ fontSize: '40px', color: 'white', margin: '0' }}>Three JS</p>
              </div>
            </div>

    </div>
  );
}