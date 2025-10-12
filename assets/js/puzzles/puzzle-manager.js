import { puzzles } from './puzzle-data.js';

class PuzzleManager {
    constructor() {
        this.puzzleModal = document.getElementById('puzzleModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.puzzleContent = document.getElementById('puzzleContent');
        this.puzzleInput = document.getElementById('puzzleInput');
        this.submitBtn = document.getElementById('submitAnswer');
        this.closeBtn = document.getElementById('closeModal');
        this.currentPuzzleId = null;

        this.attachEventListeners();
    }

    attachEventListeners() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }
        if (this.puzzleModal) {
            this.puzzleModal.addEventListener('click', (e) => {
                if (e.target === this.puzzleModal) {
                    this.hide();
                }
            });
        }
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', () => this.checkAnswer());
        }
        if (this.puzzleInput) {
            this.puzzleInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
            });
        }
    }

    show(puzzleId, objectName = '오브젝트') {
        const puzzle = puzzles[puzzleId];
        if (!puzzle) {
            console.error(`Puzzle with id "${puzzleId}" not found.`);
            return;
        }

        this.currentPuzzleId = puzzleId;
        this.modalTitle.textContent = puzzle.title;

        if (puzzle.answer === 'clue') {
            this.puzzleContent.innerHTML = `<p style="font-size: 1.1rem; color: #a6d8ff;">${puzzle.question}</p>`;
            this.puzzleInput.style.display = 'none';
            this.submitBtn.style.display = 'none';
        } else if (puzzle.answer === 'drag-drop') {
             this.puzzleInput.style.display = 'none';
             this.submitBtn.style.display = 'none';
             this.loadHtmlPuzzle('../puzzles/puzzle01.html', '.chair-puzzle-container', objectName, this.initChairPuzzle.bind(this));
        } else {
            this.puzzleContent.innerHTML = `
                <p><strong>${objectName}을(를) 조사했습니다.</strong></p>
                <p>${puzzle.question}</p>`;
            this.puzzleInput.style.display = 'block';
            this.submitBtn.style.display = 'block';
            this.puzzleInput.value = '';
            this.submitBtn.textContent = '확인';
            this.submitBtn.onclick = null; // Clear previous onclick
            this.puzzleInput.focus();
        }

        this.puzzleModal.classList.add('show');
    }

    hide() {
        this.puzzleModal.classList.remove('show');
        this.currentPuzzleId = null;
    }

    checkAnswer() {
        if (!this.currentPuzzleId) return;

        const puzzle = puzzles[this.currentPuzzleId];
        const userAnswer = this.puzzleInput.value.toLowerCase().trim();
        const correctAnswer = puzzle.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            this.puzzleContent.innerHTML = `<p style="color: #00ff00; font-weight: bold;">✅ ${puzzle.successMessage}</p>`;
            this.puzzleInput.style.display = 'none';
            this.submitBtn.textContent = '다음으로';
            this.submitBtn.onclick = () => {
                this.hide();
                if (puzzle.nextScene) {
                    this.handleNextScene(puzzle.nextScene);
                }
            };
        } else {
            this.puzzleContent.innerHTML += `<p style="color: #ff6b6b; font-weight: bold;">❌ 틀렸습니다. 다시 시도해보세요.</p>`;
            this.puzzleInput.value = '';
            this.puzzleInput.focus();
        }
    }
    
    handleNextScene(sceneType) {
        console.log(`다음 장면: ${sceneType}`);
        // This is where you would implement scene transition logic, e.g., showing/hiding elements.
    }

    loadHtmlPuzzle(url, selector, objectName, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const puzzleContainer = doc.querySelector(selector);
                if (puzzleContainer) {
                    this.puzzleContent.innerHTML = `<p><strong>${objectName}을(를) 조사했습니다.</strong></p>`;
                    this.puzzleContent.appendChild(puzzleContainer);
                    if (callback) {
                        setTimeout(callback, 100);
                    }
                } else {
                     this.puzzleContent.innerHTML = '<p>퍼즐 콘텐츠를 찾을 수 없습니다.</p>';
                }
            })
            .catch(error => {
                console.error('퍼즐 파일을 불러오는 데 실패했습니다:', error);
                this.puzzleContent.innerHTML = '<p>퍼즐을 불러오는 데 실패했습니다.</p>';
            });
    }

    initChairPuzzle() {
        const chairItems = document.querySelectorAll('.chair-item');
        const feedback = document.getElementById('puzzleFeedback');
        if (!chairItems.length || !feedback) {
            console.error("Chair puzzle elements not found");
            return;
        }
        
        let chairStates = [1, 1, 1, 1, 1, 1, 1, 1];

        const updateUI = () => {
            feedback.textContent = `CODE: ${chairStates.join('')}`;
            
            chairItems.forEach((chair) => {
                const chairNum = parseInt(chair.dataset.chair);
                const state = chairStates[chairNum - 1];
                const targetZone = document.querySelector(`.drop-zone[data-position="${chairNum}"]`);
                const storage = document.querySelector('.chair-storage');

                if (state === 0) {
                    if (targetZone && !targetZone.contains(chair)) {
                        targetZone.appendChild(chair);
                    }
                } else {
                    if (storage && !storage.contains(chair)) {
                        storage.appendChild(chair);
                    }
                }
            });
        };

        const checkCompletion = () => {
            const puzzle = puzzles['chair-puzzle'];
            if (chairStates.join('') === puzzle.correctPatternBinary) {
                feedback.textContent = '🎉 정답입니다!';
                feedback.className = 'puzzle-feedback success';
                setTimeout(() => {
                    this.hide();
                    if (puzzle.nextScene) {
                        this.handleNextScene(puzzle.nextScene);
                    }
                }, 1500);
            }
        };

        chairItems.forEach(chair => {
            chair.addEventListener('click', () => {
                const chairNum = parseInt(chair.dataset.chair);
                chairStates[chairNum - 1] = 1 - chairStates[chairNum - 1];
                updateUI();
            });
        });
        
        const confirmBtn = document.getElementById('confirmChairPuzzle');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', checkCompletion);
        }

        updateUI();
    }
}

export default new PuzzleManager();
