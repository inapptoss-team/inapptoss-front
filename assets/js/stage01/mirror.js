export function handleMirror(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '거울';
    puzzleContent.innerHTML = `<p>낡은 거울이다. 특별한 것은 보이지 않는다.</p>`;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}
