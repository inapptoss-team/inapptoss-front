export function handleStorage(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '창고';
    puzzleContent.innerHTML = `<p>정리되지 않은 잡동사니만 가득하다.</p>`;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}
