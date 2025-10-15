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

        const showContent = () => {
            this.currentPuzzleId = puzzleId;
            this.modalTitle.textContent = puzzle.title;
    
            if (puzzle.answer === 'clue') {
                this.puzzleContent.innerHTML = `<p style="font-size: 1.1rem; color: #a6d8ff;">${puzzle.question}</p>`;
                this.puzzleInput.style.display = 'none';
                this.submitBtn.style.display = 'none';
            } else if (puzzle.answer === 'drag-drop') {
                 this.puzzleInput.style.display = 'none';
                 this.submitBtn.style.display = 'none';
                 this.loadHtmlPuzzle('../puzzles/puzzle01.html', '.chair-puzzle-container', objectName, this.initChairPuzzle.bind(this), false);
            } else if (puzzle.answer === 'cabinet-lock') {
                 this.puzzleInput.style.display = 'none';
                 this.submitBtn.style.display = 'none';
                 this.loadHtmlPuzzle('../puzzles/puzzle02.html', '.cabinet-puzzle-container', objectName, this.initCabinetPuzzle.bind(this), false);
            } else if (puzzle.answer === 'mirror-code') {
                 this.puzzleInput.style.display = 'none';
                 this.submitBtn.style.display = 'none';
                 this.loadHtmlPuzzle('../puzzles/puzzle03.html', '.mirror-puzzle-container', objectName, this.initMirrorPuzzle.bind(this), false);
            } else if (puzzle.answer === 'storage-clue') {
                 this.puzzleInput.style.display = 'none';
                 this.submitBtn.style.display = 'none';
                 this.loadHtmlPuzzle('../puzzles/clue01.html', '.storage-clue-container', objectName, null, false);
            } else if (puzzle.answer === 'paper-clue') {
                 this.puzzleInput.style.display = 'none';
                 this.submitBtn.style.display = 'none';
                 this.loadHtmlPuzzle('../puzzles/clue02.html', '.paper-clue-container', objectName, null, false);
            } else {
                this.puzzleContent.innerHTML = `
                    <p>${puzzle.question}</p>`;
                this.puzzleInput.style.display = 'block';
                this.submitBtn.style.display = 'block';
                this.puzzleInput.value = '';
                this.submitBtn.textContent = '확인';
                this.submitBtn.onclick = null; // Clear previous onclick
                this.puzzleInput.focus();
            }
            this.puzzleContent.style.opacity = '1';
        }

        if (this.puzzleModal.classList.contains('show')) {
            this.puzzleContent.style.opacity = '0';
            setTimeout(showContent, 300);
        } else {
            this.puzzleContent.style.opacity = '0';
            this.puzzleModal.classList.add('show');
            showContent();
        }
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
        
        if (sceneType === 'show-paper') {
            const paperElement = document.querySelector('.map-paper');
            if (paperElement) {
                paperElement.style.display = 'block';
            }
        }
    }

    loadHtmlPuzzle(url, selector, objectName, callback, transition = true) {
        const doLoad = () => {
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
                        this.puzzleContent.innerHTML = '';
                        this.puzzleContent.appendChild(puzzleContainer);
                        if (callback) {
                            setTimeout(callback, 100);
                        }
                    } else {
                         this.puzzleContent.innerHTML = '<p>퍼즐 콘텐츠를 찾을 수 없습니다.</p>';
                    }
                    if (transition) {
                        this.puzzleContent.style.opacity = '1';
                    }
                })
                .catch(error => {
                    console.error('퍼즐 파일을 불러오는 데 실패했습니다:', error);
                    this.puzzleContent.innerHTML = '<p>퍼즐을 불러오는 데 실패했습니다.</p>';
                    if (transition) {
                        this.puzzleContent.style.opacity = '1';
                    }
                });
        }
        
        if (transition) {
            this.puzzleContent.style.opacity = '0';
            setTimeout(doLoad, 300);
        } else {
            doLoad();
        }
    }

    initChairPuzzle() {
        const chairItems = document.querySelectorAll('.chair-item');
        const feedback = document.getElementById('puzzleFeedback');
        const tableCenter = document.querySelector('.table-center');
        const arrangementArea = document.querySelector('.arrangement-area');
        if (!chairItems.length || !feedback || !tableCenter || !arrangementArea) {
            console.error("Chair puzzle elements not found");
            return;
        }
        
        let chairStates = [0, 0, 0, 0, 0, 0, 0, 0];
        
        const tableSize = Math.min(160, window.innerWidth * 0.2);
        const R_INNER = tableSize * 0.15;
        const EJECT_DELTA = tableSize * 0.18;
        const R_OUTER = R_INNER + EJECT_DELTA;

        const tableCenterRect = tableCenter.getBoundingClientRect();
        const tableCenterX = tableCenterRect.left + tableCenterRect.width / 2;
        const tableCenterY = tableCenterRect.top + tableCenterRect.height / 2;

        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach((dropZone, index) => {
            const angle = (index * 2 * Math.PI) / 8;
            const x = Math.cos(angle) * R_INNER;
            const y = Math.sin(angle) * R_INNER;
            
            dropZone.style.left = `${50 + (x / (tableSize * 0.625)) * 100}%`;
            dropZone.style.top = `${50 + (y / (tableSize * 0.625)) * 100}%`;
            dropZone.style.transform = 'translate(-50%, -50%)';
        });

        const updateUI = () => {
            feedback.textContent = `CODE: ${chairStates.join('')}`;
            
            chairItems.forEach((chair) => {
                const chairNum = parseInt(chair.dataset.chair);
                const state = chairStates[chairNum - 1];
                const targetZone = document.querySelector(`.drop-zone[data-position="${chairNum}"]`);

                if (targetZone && !targetZone.contains(chair)) {
                    targetZone.appendChild(chair);
                }

                if (state === 1) {
                    const chairIndex = chairNum - 1;
                    const angle = (chairIndex * 2 * Math.PI) / 8;

                    const translateX = Math.cos(angle) * EJECT_DELTA;
                    const translateY = Math.sin(angle) * EJECT_DELTA;
                    
                    chair.style.transform = `translate(${translateX}px, ${translateY}px)`;
                } else {
                    chair.style.transform = 'translate(0px, 0px)';
                }
            });
        };

        const checkCompletion = () => {
            const puzzle = puzzles['chair-puzzle'];
            if (chairStates.join('') === puzzle.correctPatternBinary) {
                this.showNotification('창고에서 무슨 소리가 난 것 같다.');
                
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

        if (tableCenter) {
            tableCenter.style.cursor = 'pointer';
            tableCenter.addEventListener('click', () => {
                const existingOverlay = document.querySelector('.hint-overlay');
                if (existingOverlay) {
                    existingOverlay.remove();
                    return;
                }

                const overlay = document.createElement('div');
                overlay.className = 'hint-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                `;

                const hintBox = document.createElement('div');
                hintBox.className = 'hint-box';
                hintBox.style.cssText = `
                    position: relative;
                    background: linear-gradient(135deg, rgba(26, 42, 71, 0.9), rgba(16, 32, 51, 0.95));
                    border: 2px solid rgba(100, 180, 255, 0.4);
                    border-radius: 15px;
                    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
                    max-width: 85%;
                    width: auto;
                    text-align: center;
                    color: #e6f3ff;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    box-shadow: 
                        0 0 20px rgba(57, 127, 255, 0.5),
                        0 20px 60px rgba(0, 0, 0, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    animation: scaleIn 0.3s ease-out;
                    backdrop-filter: blur(5px);
                `;
                
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '×';
                closeBtn.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    color: #a0b0c0;
                    font-size: 1.8rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.7;
                    transition: opacity 0.2s, color 0.2s;
                    line-height: 1;
                `;
                
                closeBtn.addEventListener('mouseenter', () => {
                    closeBtn.style.opacity = '1';
                    closeBtn.style.color = '#e0e8f0';
                });
                
                closeBtn.addEventListener('mouseleave', () => {
                    closeBtn.style.opacity = '0.7';
                    closeBtn.style.color = '#a0b0c0';
                });
                
                const closeHint = () => {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.2s ease-out';
                    setTimeout(() => {
                        overlay.remove();
                    }, 200);
                };

                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeHint();
                });
                
                const hintText = document.createElement('p');
                hintText.textContent = '책상 위에는 "시계의 두 손이 가리키는 곳, 9시와 3시를 기억해..."라고 적힌 메모가 놓여 있다.';
                hintText.style.cssText = `
                    margin: 0;
                    word-break: keep-all;
                    word-wrap: break-word;
                `;
                
                hintBox.appendChild(closeBtn);
                hintBox.appendChild(hintText);
                overlay.appendChild(hintBox);
                
                const modalBody = this.puzzleContent.closest('.modal-body');
                if (modalBody) {
                    modalBody.style.position = 'relative';
                    modalBody.appendChild(overlay);
                } else {
                    this.puzzleContent.style.position = 'relative';
                    this.puzzleContent.appendChild(overlay);
                }
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        closeHint();
                    }
                });
            });
        }

        updateUI();
    }

    showNotification(message, duration = 3000) {
        const existingToast = document.querySelector('.notification-toast');
        if (existingToast) {
            existingToast.remove();
        }
    
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
    
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
    
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    initCabinetPuzzle() {
        const elementButtons = document.querySelectorAll('.element-btn');
        const feedback = document.getElementById('puzzleFeedback');
        const elementChoices = document.getElementById('elementChoices');
        const lockImage = document.getElementById('lockImage');
        
        if (!elementButtons.length || !feedback || !elementChoices) {
            console.error("Cabinet puzzle elements not found");
            return;
        }

        const puzzle = puzzles['cabinet-puzzle'];
        let isAnswered = false;

        elementButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (isAnswered) return;
                
                const selectedElement = button.dataset.element;
                
                elementButtons.forEach(btn => {
                    btn.classList.remove('selected', 'wrong');
                });
                
                button.classList.add('selected');
                
                if (selectedElement === puzzle.correctAnswer) {
                    isAnswered = true;
                    
                    elementChoices.style.display = 'none';
                    
                    feedback.textContent = ''; // 정답입니다 메시지를 즉시 띄우지 않도록 수정
                    feedback.className = 'puzzle-feedback success';
                    
                    setTimeout(() => {
                        if (lockImage) {
                            lockImage.style.opacity = '0';
                            lockImage.style.transition = 'opacity 0.5s ease';
                            
                            setTimeout(() => {
                                lockImage.src = '../img/부식된자물쇠.png';
                                lockImage.style.opacity = '1';
                                // 이미지가 바뀔 때 성공 메시지를 띄움
                                feedback.textContent = ` ${puzzle.successMessage}`; 
                            }, 500);
                        }
                    }, 1000);
                    
                    setTimeout(() => {
                        this.hide();
                        if (puzzle.nextScene) {
                            this.handleNextScene(puzzle.nextScene);
                        }
                    }, 3500); // 메시지를 읽을 수 있도록 시간을 3.5초로 늘림
                } else {
                    button.classList.remove('selected');
                    button.classList.add('wrong');
                    
                    setTimeout(() => {
                        button.classList.remove('wrong');
                    }, 500);
                }
            });
        });
    }

    initMirrorPuzzle() {
        const feedback = document.getElementById('puzzleFeedback');
        const codeInput = document.getElementById('mirrorCodeInput');
        const confirmBtn = document.getElementById('confirmMirrorPuzzle');
        
        if (!feedback || !codeInput || !confirmBtn) {
            console.error("Mirror puzzle elements not found");
            return;
        }

        const puzzle = puzzles['mirror-puzzle'];
        let isAnswered = false;

        codeInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        codeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && codeInput.value.length === 4) {
                confirmBtn.click();
            }
        });

        confirmBtn.addEventListener('click', () => {
            if (isAnswered) return;
            
            const userAnswer = codeInput.value.trim();
            
            if (userAnswer.length !== 4) {
                codeInput.classList.add('wrong');
                setTimeout(() => {
                    codeInput.classList.remove('wrong');
                }, 500);
                return;
            }
            
            if (userAnswer === puzzle.correctAnswer) {
                isAnswered = true;
                feedback.textContent = '🎉 정답입니다!';
                feedback.className = 'puzzle-feedback success';
                codeInput.disabled = true;
                
                setTimeout(() => {
                    this.hide();
                    if (puzzle.nextScene) {
                        this.handleNextScene(puzzle.nextScene);
                    }
                }, 1500);
            } else {
                codeInput.classList.add('wrong');
                codeInput.value = '';
                codeInput.focus();
                
                setTimeout(() => {
                    codeInput.classList.remove('wrong');
                }, 500);
            }
        });

        codeInput.focus();
    }
}

export default new PuzzleManager();
