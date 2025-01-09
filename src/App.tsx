import { useState } from 'react'
import BasicDragDrop from './components/BasicDragDrop'
import SortableList from './components/SortableList'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

type ExampleType = 'basic' | 'sortable' | 'kanban'

function App() {
  const [activeExample, setActiveExample] = useState<ExampleType>('basic')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Drag & Drop</h1>
        <p>React + TypeScript로 만들어본 드래그 앤 드롭 예제들</p>
      </header>

      <nav className="example-nav">
        <button
          className={activeExample === 'basic' ? 'active' : ''}
          onClick={() => setActiveExample('basic')}
          aria-label="HTML5 API 예제 보기"
        >
          HTML5 API
        </button>
        <button
          className={activeExample === 'sortable' ? 'active' : ''}
          onClick={() => setActiveExample('sortable')}
          aria-label="Sortable List 예제 보기"
        >
          Sortable List
        </button>
        <button
          className={activeExample === 'kanban' ? 'active' : ''}
          onClick={() => setActiveExample('kanban')}
          aria-label="Kanban Board 예제 보기"
        >
          Kanban Board
        </button>
      </nav>

      <main className="example-container">
        {activeExample === 'basic' && <BasicDragDrop />}
        {activeExample === 'sortable' && <SortableList />}
        {activeExample === 'kanban' && <KanbanBoard />}
      </main>
    </div>
  )
}

export default App

