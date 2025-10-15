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
        const R_INNER = tableSize * 0.2; // 의자 위치를 더 안쪽으로
        const EJECT_DELTA = tableSize * 0.25; // 두 번째 원 위치까지 이동하도록 조정
        const R_OUTER = R_INNER + EJECT_DELTA; // 의자 이동 위치

        const tableCenterRect = tableCenter.getBoundingClientRect();
        const tableCenterX = tableCenterRect.left + tableCenterRect.width / 2;
        const tableCenterY = tableCenterRect.top + tableCenterRect.height / 2;

        // Canvas에 원형 픽셀 선 그리기
        const drawPixelCircles = () => {
            const canvas = document.getElementById('pixelCircle');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const canvasSize = Math.min(300, window.innerWidth * 0.4);
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            
            const centerX = canvasSize / 2;
            const centerY = canvasSize / 2;
            
            // 실제 의자 위치 확인을 위한 디버깅
            console.log('R_INNER:', R_INNER, 'R_OUTER:', R_OUTER);
            console.log('tableSize:', tableSize, 'canvasSize:', canvasSize);
            
            // 픽셀 스타일로 원 그리기
            const drawPixelCircle = (radius, color) => {
                ctx.fillStyle = color;
                const pixelSize = 2;
                
                for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    // 픽셀 효과를 위해 작은 사각형으로 그리기
                    ctx.fillRect(
                        Math.floor(x - pixelSize/2), 
                        Math.floor(y - pixelSize/2), 
                        pixelSize, 
                        pixelSize
                    );
                }
            };
            
            // 실제 의자 위치에 맞춰서 원 그리기
            // R_INNER = 32, R_OUTER = 72 (EJECT_DELTA 증가로 변경됨)
            const chairBaseRadius = (R_INNER / tableSize) * canvasSize * 0.9; // 의자 기본 위치
            const chairMoveRadius = (R_OUTER / tableSize) * canvasSize * 0.7; // 의자 이동 위치 (두 번째 원) - 반지름 줄임
            const chairThirdRadius = (R_OUTER / tableSize) * canvasSize * 0.8; // 세 번째 원 - 반지름 줄임
            
            console.log('Canvas radii:', chairBaseRadius, chairMoveRadius, chairThirdRadius);
            console.log('R_INNER:', R_INNER, 'R_OUTER:', R_OUTER);
            
            // 의자 기본 위치 원 (drop-zone 위치)
            drawPixelCircle(chairBaseRadius, '#c4eaeb');
            
            // 의자 이동 위치 원 (클릭 시 이동하는 위치)
            drawPixelCircle(chairMoveRadius, '#c4eaeb');
            
            // 세 번째 원 (더 바깥쪽)
            drawPixelCircle(chairThirdRadius, '#c4eaeb');
        };

        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach((dropZone, index) => {
            const angle = (index * 2 * Math.PI) / 8;
            const x = Math.cos(angle) * R_INNER;
            const y = Math.sin(angle) * R_INNER;
            
            const leftPercent = 50 + (x / (tableSize * 0.625)) * 100;
            const topPercent = 50 + (y / (tableSize * 0.625)) * 100;
            
            dropZone.style.left = `${leftPercent}%`;
            dropZone.style.top = `${topPercent}%`;
            dropZone.style.transform = 'translate(-50%, -50%)';
            
            // 첫 번째 drop-zone의 실제 위치 로그
            if (index === 0) {
                console.log('Drop-zone 0 position:', leftPercent, topPercent);
                console.log('Calculated from:', x, y, 'angle:', angle);
            }
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

        // 원형 픽셀 선 그리기
        drawPixelCircles();
        
        updateUI();
    }

    showNotification(message, duration = 3000) {
        const existingToast = document.querySelector('.notification-toast');
        if (existingToast) {
            existingToast.remove();
        }
    
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = message.replace(/\n/g, '<br>');
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
                                feedback.classList.add('show'); 
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
                feedback.className = 'puzzle-feedback success show';
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
