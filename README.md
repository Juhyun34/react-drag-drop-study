# Drag and Drop Study

React TypeScript로 구현한 드래그 앤 드롭 기능 학습 프로젝트입니다.

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)을 열어 확인하세요.

## 📚 예제

이 프로젝트는 세 가지 드래그 앤 드롭 예제를 포함합니다:

### 1. 기본 예제 (HTML5 API)
- HTML5의 네이티브 Drag and Drop API를 사용한 기본 예제
- 아이템을 드래그하여 드롭 영역으로 이동
- `onDragStart`, `onDragOver`, `onDrop` 이벤트 핸들러 사용

### 2. 정렬 가능한 리스트 (dnd-kit)
- `@dnd-kit` 라이브러리를 사용한 리스트 정렬 예제
- 리스트 아이템을 드래그하여 순서 변경
- 키보드 접근성 지원

### 3. 칸반 보드 (dnd-kit)
- 칸반 보드 스타일의 드래그 앤 드롭 예제
- 태스크를 다른 컬럼으로 이동
- 같은 컬럼 내에서 순서 변경

## 🛠️ 사용된 기술

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **@dnd-kit/core** - 드래그 앤 드롭 핵심 기능
- **@dnd-kit/sortable** - 정렬 가능한 리스트 기능
- **@dnd-kit/utilities** - 유틸리티 함수

## 📖 학습 포인트

### HTML5 Drag and Drop API
- `draggable` 속성
- `onDragStart`, `onDragOver`, `onDrop` 이벤트
- `dataTransfer` 객체를 통한 데이터 전달

### dnd-kit 라이브러리
- `DndContext`로 드래그 컨텍스트 제공
- `useSortable` 훅으로 정렬 가능한 아이템 생성
- `useDroppable` 훅으로 드롭 영역 생성
- 접근성 및 키보드 지원

## 📝 라이선스

이 프로젝트는 학습 목적으로 만들어졌습니다.

