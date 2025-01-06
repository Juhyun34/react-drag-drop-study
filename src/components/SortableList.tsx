import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortableList } from '../hooks/useSortableList'
import type { Task } from '../types/sortableList'
import { PRIORITY_COLORS } from '../constants/sortableList'
import './SortableList.css'

function SortableList() {
  const { tasks, sensors, handleDragEnd } = useSortableList()

  return (
    <div className="sortable-list">
      <div className="example-info">
        <h2>Sortable List (dnd-kit)</h2>
        <p>
          dnd-kit으로 만든 정렬 가능한 리스트
          <br />
          드래그해서 순서 바꿔보기
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="tasks-container">
            {tasks.map((task) => (
              <SortableItem key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

type SortableItemProps = {
  task: Task
}

function SortableItem({ task }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-handle" {...attributes} {...listeners}>
        <span className="drag-icon">☰</span>
      </div>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span
            className="task-priority"
            style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
          >
            {task.priority === 'high'
              ? 'High'
              : task.priority === 'medium'
              ? 'Mid'
              : 'Low'}
          </span>
        </div>
        <p className="task-description">{task.description}</p>
      </div>
    </div>
  )
}

export default SortableList

