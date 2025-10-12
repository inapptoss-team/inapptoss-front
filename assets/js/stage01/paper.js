export function handlePaper(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '거꾸로 쓰인 종이';
    puzzleContent.innerHTML = `
        <p style="font-size: 1.1rem; color: #a6d8ff; text-align: center; margin-bottom: 1rem;">거울에 비춰보면 뭔가 보일지도...</p>
        <img src="../img/종이.png" alt="거꾸로 쓰인 종이" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
    `;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}

