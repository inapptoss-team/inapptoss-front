/**
 * THE GRADUATE ESCAPE - Main JavaScript
 * Navigation and click handling for the cover screen
 */

import puzzleManager from './puzzles/puzzle-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('[data-action="start"]');
  const labBtn = document.querySelector('[data-action="lab"]');
  const backgroundBtn = document.querySelector('[data-action="background"]');
  const lockedBtns = document.querySelectorAll('[data-locked="true"]');

  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './assets/lab/';
    });
  }

  if (labBtn) {
    labBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './lab/';
    });
  }

  if (backgroundBtn) {
    backgroundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './background/';
    });
  }

  lockedBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.add('shake');
      setTimeout(() => btn.classList.remove('shake'), 400);
    });
  });

  const exploreBtn = document.querySelector('.explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './assets/lab/intro.html';
    });
  }

  // General object buttons (not on the map) that trigger puzzles
  const objectBtns = document.querySelectorAll('.object-btn');
  objectBtns.forEach((btn) => {
    if (btn.closest('.map-container')) {
      return; // Skip map objects, handled by interactions.js
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const puzzleType = btn.dataset.puzzle;
      const objectName = btn.dataset.object;
      if (puzzleType) {
        puzzleManager.show(puzzleType, objectName);
      }
    });
  });
});

// === 픽셀 의자 그리기 → dataURL 반환 ===
function makeChairDataURL() {
  // 의자 원본 해상도 (작게 그린 뒤 CSS로 확대)
  const w = 20, h = 30;
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const ctx = off.getContext('2d', { alpha: true });
  ctx.imageSmoothingEnabled = false;

  // 색상
  const darkBrown = "#663D2E";
  const mediumBrown = "#8E5F48";
  const lightBrown = "#A87A5B";

  // 등받이
  ctx.fillStyle = darkBrown;
  ctx.fillRect(4, 0, 12, 15);

  // 등받이 상단 하이라이트
  ctx.fillStyle = lightBrown;
  ctx.fillRect(5, 1, 10, 2);

  // 좌판
  ctx.fillStyle = mediumBrown;
  ctx.fillRect(3, 15, 14, 4);

  // 다리
  ctx.fillStyle = darkBrown;
  ctx.fillRect(3, 19, 2, 11);   // 좌 앞
  ctx.fillRect(2, 19, 2, 9);    // 좌 뒤
  ctx.fillRect(15, 19, 2, 11);  // 우 앞
  ctx.fillRect(16, 19, 2, 9);   // 우 뒤

  return off.toDataURL('image/png');
}

// === 모든 .chair-item에 픽셀 의자 적용 ===
const dataURL = makeChairDataURL();
document.querySelectorAll('.chair-item').forEach(el => {
  el.style.backgroundImage = `url(${dataURL})`;
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundPosition = 'center';
  el.style.backgroundSize = 'contain';
  // 픽셀 보존
  el.style.imageRendering = 'pixelated';

  // 의자 크기(필요 시 조절). .chair-item의 고정 크기가 없다면 지정해 주세요.
  // 예: 40x60로 보이게
  el.style.width = '40px';
  el.style.height = '60px';
});

