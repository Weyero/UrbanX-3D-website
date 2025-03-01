import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>ok —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>22/12/2022</div>
    </div>
  )
}

const rootElement = document.getElementById('root');
rootElement.innerHTML = ''; // Очищаем старый контент

const root = createRoot(rootElement);
root.render(
  <div id="scrollContainer">
    <App />
    <Overlay />
  </div>
);
