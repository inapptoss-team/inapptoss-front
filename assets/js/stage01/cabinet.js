import puzzleManager from '../puzzles/puzzle-manager.js';

export function handleCabinet(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '캐비넷';
    puzzleContent.innerHTML = `<p>잠겨있는 캐비넷이다. 무언가 특별한 방법으로 열어야 할 것 같다.</p>`;
    setTimeout(() => {
        puzzleManager.show('cabinet-puzzle', '캐비넷');
    }, 0);
}
