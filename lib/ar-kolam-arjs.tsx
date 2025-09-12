// AR.js marker-based AR fallback for Kolam placement
// Usage: Call startKolamARjs(kolamImg) to launch AR.js view

import React from 'react';

export function startKolamARjs(kolamImg: string) {
  // Detect iOS
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      return stream;
    } catch (err) {
      return null;
    }
  }

  requestCamera().then((stream) => {
    if (!stream) {
      alert(
        'Camera access denied!\n\nTo use AR, please allow camera access when prompted. If you missed the prompt, go to your browser settings and enable camera permissions for this site. On iOS: Settings > Safari/Chrome > Camera > Allow Access.'
      );
      return;
    }
    const arWindow = window.open('', '_blank', 'width=800,height=600');
    if (!arWindow) {
      alert(
        'Unable to open AR window!\n\nThis is usually caused by a popup blocker. Please disable popup blockers for this site and try again.\n\nHow to fix:\n- Tap the browser address bar and allow popups for this site.\n- If using iOS, go to Settings > Safari > Block Pop-ups (turn OFF).\n- Try again after disabling pop-up blockers.'
      );
      return;
    }
    // For iOS, show camera overlay first
    if (isIOS) {
      arWindow.document.write(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <title>Kolam Camera Overlay</title>
            <style>
              html,body { height: 100%; margin: 0; overscroll-behavior: none; -webkit-user-select: none; -webkit-touch-callout: none; }
              body { overflow: hidden; background: #000; }
              #kolamImg { position: absolute; display: none; pointer-events: auto; z-index: 10; touch-action: none; transform-origin: center center; }
              #tapOverlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9; background: transparent; touch-action: none; }
            </style>
          </head>
          <body>
            <video id="kolamCam" autoplay playsinline style="width:100vw;height:100vh;object-fit:cover;position:fixed;top:0;left:0;"></video>
            <div id="tapOverlay"></div>
            <img id="kolamImg" src="${kolamImg}" width="360" height="360" />
            <div style="position:fixed;bottom:10px;left:0;width:100%;text-align:center;color:#fff;background:rgba(0,0,0,0.5);font-size:14px;padding:8px;z-index:999;">
              Tap anywhere on the camera to place your Kolam image.<br>Drag to move, pinch to resize the Kolam (not the camera).<br>Marker AR may not be available on iOS. For best AR, use Android Chrome or Quick Look on iOS.
            </div>
            <script>
              navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
                document.getElementById('kolamCam').srcObject = stream;
              }).catch(function(){
                // ignore
              });
              var overlay = document.getElementById('tapOverlay');
              var img = document.getElementById('kolamImg');
              var dragging = false, startX = 0, startY = 0, imgLeft = 0, imgTop = 0, startDist = 0, startSize = 360;
              function setImgPos(x, y) {
                img.style.left = (x - img.width/2) + 'px';
                img.style.top = (y - img.height/2) + 'px';
                imgLeft = x - img.width/2;
                imgTop = y - img.height/2;
              }
              overlay.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (e.touches.length === 1) {
                  var touch = e.touches[0];
                  img.style.display = 'block';
                  setImgPos(touch.clientX, touch.clientY);
                  dragging = true;
                  startX = touch.clientX;
                  startY = touch.clientY;
                } else if (e.touches.length === 2) {
                  // Pinch start
                  startDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                  );
                  startSize = img.width;
                }
              }, { passive: false });
              overlay.addEventListener('touchmove', function(e) {
                e.preventDefault();
                if (dragging && e.touches.length === 1) {
                  var touch = e.touches[0];
                  setImgPos(touch.clientX, touch.clientY);
                } else if (e.touches.length === 2) {
                  // Pinch zoom
                  var dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                  );
                  var newSize = Math.max(80, Math.min(800, Math.round(startSize * dist / startDist)));
                  img.width = newSize;
                  img.height = newSize;
                  // adjust position so center stays roughly the same
                  img.style.left = (imgLeft + (img.width - startSize)/2) + 'px';
                  img.style.top = (imgTop + (img.height - startSize)/2) + 'px';
                }
              }, { passive: false });
              overlay.addEventListener('touchend', function(e) {
                dragging = false;
              });
              overlay.addEventListener('click', function(e) {
                img.style.display = 'block';
                setImgPos(e.clientX, e.clientY);
              });
              // Mouse drag for desktop
              img.addEventListener('mousedown', function(e) {
                dragging = true;
                startX = e.clientX;
                startY = e.clientY;
                imgLeft = parseInt(img.style.left) || 0;
                imgTop = parseInt(img.style.top) || 0;
              });
              document.addEventListener('mousemove', function(e) {
                if (dragging) {
                  img.style.left = (imgLeft + e.clientX - startX) + 'px';
                  img.style.top = (imgTop + e.clientY - startY) + 'px';
                }
              });
              document.addEventListener('mouseup', function(e) {
                dragging = false;
              });
            </script>
          </body>
        </html>
      `);
      // Optionally, try to load AR.js after camera overlay (not reliable on iOS)
      // You can add a button to attempt AR.js marker overlay if desired
      return;
    }
    // For non-iOS, proceed with AR.js marker AR
    arWindow.document.write(`
      <html>
        <head>
          <script src='https://aframe.io/releases/1.2.0/aframe.min.js'></script>
          <script src='https://cdn.jsdelivr.net/npm/ar.js@3.3.2/aframe/build/aframe-ar.js'></script>
          <style>body { margin: 0; overflow: hidden; font-family: sans-serif; }</style>
        </head>
        <body>
          <a-scene embedded arjs vr-mode-ui="enabled: false">
            <a-marker preset="hiro">
              <a-image src="${kolamImg}" width="2" height="2"></a-image>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
          <div id="ar-help" style="position:fixed;bottom:10px;left:0;width:100%;text-align:center;color:#333;background:rgba(255,255,255,0.8);font-size:14px;padding:8px;z-index:999;">
            If you see a blank screen, make sure camera access is allowed and the Hiro marker is visible to your camera.
          </div>
        </body>
      </html>
    `);
  });
}
