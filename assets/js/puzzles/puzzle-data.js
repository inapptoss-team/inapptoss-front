export const puzzles = {
    'chair-puzzle': {
        title: '의자 배치 퍼즐',
        question: '의자들을 클릭해서 원형 탁자에 배치하세요!',
        answer: 'drag-drop',
        successMessage: '완벽합니다! 원형 탁자 배치가 완성되었습니다.',
        nextScene: 'cabinet-open',
        correctPatternBinary: '10001000'
    },
    'cabinet-puzzle': {
        title: '캐비넷 퍼즐',
        question: '올바른 원소를 선택하여 캐비넷을 열어주세요.',
        answer: 'cabinet-lock',
        correctAnswer: 'Ga',
        successMessage: '캐비넷이 열렸습니다! 새로운 아이템을 발견했습니다.',
        nextScene: 'show-paper'
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
    'mirror-puzzle': {
        title: '거울 퍼즐',
        question: '각 원소의 원자번호를 순서대로 입력하세요.',
        answer: 'mirror-code',
        correctAnswer: '3214',
        successMessage: '거울 속의 비밀을 풀었습니다!',
        nextScene: 'mirror-unlocked'
    },
    'storage-clue': {
        title: '창고',
        question: '▶ Ga (갈륨)을 얻었다.<br>▶ Hg (수은)을 얻었다.<br>▶ K (칼륨)을 얻었다.<br>▶ Li (리튬)을 얻었다.<br>▶ C₂H₅OH (에탄올)을 얻었다.',
        answer: 'clue'
    },
    'paper-clue': {
        title: '거꾸로 쓰인 종이',
        question: '<p style="font-size: 1.1rem; color: #a6d8ff; text-align: center; margin-bottom: 1rem;">거울에 비춰보면 뭔가 보일지도...</p><img src="../img/종이.png" alt="거꾸로 쓰인 종이" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">',
        answer: 'clue'
    }
};
