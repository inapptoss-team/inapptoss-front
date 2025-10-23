import { makeDraggable } from '../map/drag-and-drop.js';

const loadHtmlPuzzle = (puzzleId) => {
    if (window.puzzleManager) {
        window.puzzleManager.show(puzzleId);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const setupInteraction = (selector, puzzleId) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                loadHtmlPuzzle(puzzleId);
            });
        }
    };

    setupInteraction('.map-desk', 'chair-puzzle');
    setupInteraction('.map-mirror', 'mirror-puzzle');
    setupInteraction('.map-storage', 'storage-clue');
    setupInteraction('.map-cabinet', 'cabinet-puzzle');
    setupInteraction('.map-paper', 'paper-clue');

    if (window.puzzleManager) {
        const progress = window.puzzleManager.loadProgress();
        const paperElement = document.querySelector('.map-paper');

        if (progress.completedPuzzles.includes('cabinet-puzzle')) {
            if (paperElement) {
                paperElement.style.display = 'block';
                makeDraggable(paperElement, window.puzzleManager, { dropTarget: '.map-mirror', dropPuzzleId: 'mirror-puzzle' });
            }
        }
    }
});
