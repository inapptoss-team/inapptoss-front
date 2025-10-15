export function handleDesk(modalTitle, puzzleContent, puzzleInput, submitBtn) {
    modalTitle.textContent = '책상 위 단서';
    puzzleContent.innerHTML = `<p>연구실 어딘가에 있는 캐비넷의 비밀번호는 "1234" 이다.</p>`;
    puzzleInput.style.display = 'none';
    submitBtn.style.display = 'none';
}
