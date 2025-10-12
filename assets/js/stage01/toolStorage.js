export function handleToolStorage(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '도구 보관함';
    puzzleContent.innerHTML = `<p>다양한 실험 도구들이 있지만, 지금 당장 필요한 것은 없어 보인다.</p>`;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}
