export const puzzles = {
    'chair-puzzle': {
        title: '의자 배치',
        question: '의자들을 클릭해서 원형 탁자에 배치하세요!',
        answer: 'drag-drop',
        successMessage: '창고에서 무슨 소리가 난 것 같다.',
        nextScene: 'storage-sound',
        correctPatternBinary: '10001000'
    },
    'cabinet-puzzle': {
        title: '캐비넷',
        question: '올바른 원소를 선택하여 캐비넷을 열어주세요.',
        answer: 'cabinet-lock',
        correctAnswer: 'Ga',
        successMessage: '거울 주변에 단서가 생긴 것 같다. 확인해보자.',
        nextScene: 'show-paper'
    },
    'materials-puzzle': {
        title: '재료',
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
        title: '컴퓨터',
        question: '컴퓨터의 로그인 비밀번호는? (6자리)',
        answer: 'escape',
        successMessage: '컴퓨터에 접속했습니다! 중요한 정보를 발견했습니다.',
        nextScene: 'computer-unlocked'
    },
    'mirror-puzzle': {
        title: '거울',
        question: '각 원소의 원자번호를 순서대로 입력하세요.',
        answer: 'mirror-code',
        correctAnswer: '3214',
        successMessage: '거울 속의 비밀을 풀었습니다!',
        nextScene: 'mirror-unlocked'
    },
    'storage-clue': {
        title: '창고',
        question: '의자 퍼즐을 완료한 후 창고에서 발견한 재료들을 확인해보세요.',
        answer: 'storage-clue'
    },
    'paper-clue': {
        title: '거꾸로 쓰인 종이',
        question: '거울에 비춰보면 뭔가 보일지도...',
        answer: 'paper-clue'
    }
};
