export function handlePaper(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '거꾸로 쓰인 종이';
    puzzleContent.innerHTML = `<p>거울에 비춰보면 뭔가 보일지도...</p>`;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}

