import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'

function Overlay() {
  return (
    <div>
    </div>
  )
}

const rootElement = document.getElementById('root');
rootElement.innerHTML = ''; // Очищаем старый контент

const root = createRoot(rootElement);
root.render(
  <>
    <App />
    <Overlay />
  </>
);
