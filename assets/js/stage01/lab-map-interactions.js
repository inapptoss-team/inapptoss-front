import { handleDesk } from './desk.js';
import { handleMirror } from './mirror.js';
import { handleStorage } from './storage.js';
import { handleCabinet } from './cabinet.js';
import { handlePaper } from './paper.js';

document.addEventListener('DOMContentLoaded', () => {
    const puzzleModal = document.getElementById('puzzleModal');
    if (!puzzleModal) return;

    const modalTitle = document.getElementById('modalTitle');
    const puzzleContent = document.getElementById('puzzleContent');
    const puzzleInput = document.getElementById('puzzleInput');
    const submitBtn = document.getElementById('submitAnswer');

    const showModal = () => puzzleModal.classList.add('show');

    const setupInteraction = (selector, handler) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                handler(modalTitle, puzzleContent, puzzleInput, submitBtn);
                showModal();
            });
        }
    };

    setupInteraction('.map-desk', handleDesk);
    setupInteraction('.map-mirror', handleMirror);
    setupInteraction('.map-storage', handleStorage);
    setupInteraction('.map-cabinet', handleCabinet);
    setupInteraction('.map-paper', handlePaper);
});
