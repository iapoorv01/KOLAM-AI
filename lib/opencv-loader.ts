// OpenCV.js loader for Next.js
// This file loads OpenCV.js from CDN and exposes it globally as window.cv

export function loadOpenCV(callback: () => void) {
  if (typeof window === 'undefined') return;
  if ((window as any).cv) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://docs.opencv.org/4.x/opencv.js';
  script.async = true;
  script.onload = () => {
    // Wait for OpenCV to be ready
    if ((window as any).cv && (window as any).cv['onRuntimeInitialized']) {
      (window as any).cv['onRuntimeInitialized'] = callback;
    } else {
      callback();
    }
  };
  document.body.appendChild(script);
}
