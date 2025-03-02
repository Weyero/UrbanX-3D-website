import { useEffect } from 'react';

const SplinePage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <spline-viewer
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/LRxu-2O0uGpncrP1/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      ></spline-viewer>
    </div>
  );
};

export default SplinePage;
