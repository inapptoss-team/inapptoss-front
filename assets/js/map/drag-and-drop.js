function isOverlapping(elem1, elem2) {
    if (!elem1 || !elem2) return false;

    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

export function makeDraggable(element, puzzleManager, options = {}) {
    let isDragging = false;
    let offsetX, offsetY;
    let hasDragged = false;
    let startX, startY;
    let startClientX, startClientY;

    const savedPos = puzzleManager.getDraggablePosition(element.dataset.puzzle);
    if (savedPos) {
        element.style.left = savedPos.x;
        element.style.top = savedPos.y;
    }

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasDragged = false;
        
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        
        startClientX = e.clientX;
        startClientY = e.clientY;
        startX = element.style.left;
        startY = element.style.top;
        
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        if (!hasDragged) {
            const dx = Math.abs(e.clientX - startClientX);
            const dy = Math.abs(e.clientY - startClientY);
            if (dx > 5 || dy > 5) {
                hasDragged = true;
            }
        }
        
        if (hasDragged) {
            e.preventDefault();

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            const mapContainer = document.querySelector('.map-container');
            const mapRect = mapContainer.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + elementRect.width > mapRect.width) newX = mapRect.width - elementRect.height;
            if (newY + elementRect.height > mapRect.height) newY = mapRect.height - elementRect.height;
            
            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            const dropTarget = options.dropTarget ? document.querySelector(options.dropTarget) : null;

            if (hasDragged) {
                let isDroppedOnTarget = false;
                
                if (dropTarget && dropTarget.tagName === 'path') {
                    const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);
                    isDroppedOnTarget = elementsAtPoint.includes(dropTarget);
                } else if (dropTarget) {
                    isDroppedOnTarget = isOverlapping(element, dropTarget);
                }
                
                if (isDroppedOnTarget) {
                    puzzleManager.show(options.dropPuzzleId, '거울', { fromDrop: true });
                    element.style.left = startX;
                    element.style.top = startY;
                } else {
                    puzzleManager.saveDraggablePosition(element.dataset.puzzle, {
                        x: element.style.left,
                        y: element.style.top
                    });
                }
            }
            
            isDragging = false;
            element.style.cursor = 'grab';
        }
    });

    element.addEventListener('click', (e) => {
        if (hasDragged) {
            e.stopPropagation();
        } else if (options.onClick) {
            e.stopPropagation();
            options.onClick();
        }
    }, true);
}
