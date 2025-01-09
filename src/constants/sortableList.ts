import type { Task } from '../types/sortableList'

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: '기획서 작성',
    description: '프로젝트 기획서 초안',
    priority: 'high',
  },
  {
    id: '2',
    title: '코드 리뷰',
    description: 'PR 리뷰하기',
    priority: 'medium',
  },
  {
    id: '3',
    title: '문서화',
    description: 'API 문서 정리',
    priority: 'low',
  },
  {
    id: '4',
    title: '회의 준비',
    description: '주간 회의 자료',
    priority: 'high',
  },
  {
    id: '5',
    title: '테스트 작성',
    description: '테스트 코드 추가',
    priority: 'medium',
  },
]

export const PRIORITY_COLORS = {
  high: '#FF6B6B',
  medium: '#FFD93D',
  low: '#6BCB77',
} as const

export const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Mid',
  low: 'Low',
} as const
