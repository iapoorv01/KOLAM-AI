// Loads TensorFlow.js and BodyPix model
// Kolam design extraction using OpenCV.js color thresholding
export async function removeBackground(
  imageElement: HTMLImageElement,
  threshold: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    function process() {
      try {
        const cv = (window as any).cv;
        if (!cv || !cv.imread) {
          console.error('OpenCV.js not loaded');
          reject('OpenCV.js not loaded');
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Canvas context is null');
          reject('Canvas context is null');
          return;
        }
        ctx.drawImage(imageElement, 0, 0);
        const src = cv.imread(canvas);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        // Uncomment to invert if Kolam is white on black
        // cv.bitwise_not(gray, gray);
        const mask = new cv.Mat();
        cv.threshold(gray, mask, threshold, 255, cv.THRESH_BINARY_INV);
        const result = new cv.Mat();
        cv.cvtColor(src, result, cv.COLOR_RGBA2RGBA, 0);
        for (let y = 0; y < result.rows; y++) {
          for (let x = 0; x < result.cols; x++) {
            const maskVal = mask.ucharPtr(y, x)[0];
            result.ucharPtr(y, x)[3] = maskVal ? 255 : 0;
          }
        }
        cv.imshow(canvas, result);
        const dataUrl = canvas.toDataURL('image/png');
        src.delete(); gray.delete(); mask.delete(); result.delete();
        resolve(dataUrl);
      } catch (err) {
        console.error('Kolam background removal error:', err);
        reject(err);
      }
    }
    if ((window as any).cv && (window as any).cv.imread) {
      process();
    } else {
      const script = document.createElement('script');
      script.src = 'https://docs.opencv.org/4.x/opencv.js';
      script.async = true;
      script.onload = () => {
        (window as any).cv['onRuntimeInitialized'] = process;
      };
      script.onerror = () => {
        console.error('Failed to load OpenCV.js');
        reject('Failed to load OpenCV.js');
      };
      document.body.appendChild(script);
    }
  });
}

