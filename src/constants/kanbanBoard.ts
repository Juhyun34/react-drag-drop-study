import type { Task, ColumnType, Columns } from '../types/kanbanBoard'

export const INITIAL_COLUMNS: Columns = {
  todo: [
    {
      id: '1',
      title: '새 기능 추가',
      description: '인증 기능 구현',
    },
    {
      id: '2',
      title: '버그 수정',
      description: '로그인 페이지 레이아웃',
    },
  ],
  inProgress: [
    {
      id: '3',
      title: 'API 개발',
      description: 'REST API 엔드포인트',
    },
  ],
  done: [
    {
      id: '4',
      title: '디자인 시스템',
      description: '컴포넌트 라이브러리',
    },
  ],
}

export const COLUMN_TITLES: Record<ColumnType, string> = {
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
}

export const COLUMN_COLORS: Record<ColumnType, string> = {
  todo: '#FF6B6B',
  inProgress: '#FFD93D',
  done: '#6BCB77',
}

