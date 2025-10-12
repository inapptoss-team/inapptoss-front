export const puzzles = {
    'chair-puzzle': {
        title: '의자 배치 퍼즐',
        question: '의자들을 클릭해서 원형 탁자에 배치하세요!',
        answer: 'drag-drop',
        successMessage: '완벽합니다! 원형 탁자 배치가 완성되었습니다.',
        nextScene: 'cabinet-open',
        correctPatternBinary: '00100010'
    },
    'cabinet-puzzle': {
        title: '캐비넷 퍼즐',
        question: '캐비넷의 비밀번호는 무엇일까요? (4자리 숫자)',
        answer: '1234',
        successMessage: '캐비넷이 열렸습니다! 새로운 아이템을 발견했습니다.',
        nextScene: 'materials-found'
    },
    'materials-puzzle': {
        title: '재료 퍼즐',
        question: '실험 재료 중 가장 중요한 것은? (영어로)',
        answer: 'chemical',
        successMessage: '올바른 재료를 선택했습니다!',
        nextScene: 'experiment-ready'
    },
    'desk-clue': {
        title: '책상 위 단서',
        question: '연구실 어딘가에 있는 캐비넷의 비밀번호는 "1234" 이다.',
        answer: 'clue',
    },
    'computer-puzzle': {
        title: '컴퓨터 퍼즐',
        question: '컴퓨터의 로그인 비밀번호는? (6자리)',
        answer: 'escape',
        successMessage: '컴퓨터에 접속했습니다! 중요한 정보를 발견했습니다.',
        nextScene: 'computer-unlocked'
    },
    'mirror-clue': {
        title: '거울',
        question: '낡은 거울이다. 특별한 것은 보이지 않는다.',
        answer: 'clue'
    },
    'tool-storage-clue': {
        title: '도구 보관함',
        question: '다양한 실험 도구들이 있지만, 지금 당장 필요한 것은 없어 보인다.',
        answer: 'clue'
    }
};
