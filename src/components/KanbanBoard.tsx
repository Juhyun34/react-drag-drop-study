import { DndContext, closestCorners } from '@dnd-kit/core'
import { useKanbanBoard, ColumnType } from '../hooks/useKanbanBoard'
import Column from './KanbanColumn'
import './KanbanBoard.css'

export type { Task, ColumnType } from '../hooks/useKanbanBoard'

function KanbanBoard() {
  const {
    columns,
    activeId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    columnTitles,
    columnColors,
  } = useKanbanBoard()

  return (
    <div className="kanban-board">
      <div className="example-info">
        <h2>Kanban Board (dnd-kit)</h2>
        <p>
          칸반 보드 스타일 드래그 앤 드롭
          <br />
          태스크를 드래그해서 컬럼 간 이동하거나 순서 변경
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-container">
          {(Object.keys(columns) as ColumnType[]).map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={columnTitles[columnId]}
              tasks={columns[columnId]}
              color={columnColors[columnId]}
              activeId={activeId}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default KanbanBoard

