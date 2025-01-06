import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Task, ColumnType } from '../types/kanbanBoard'
import './KanbanColumn.css'

type KanbanColumnProps = {
  id: ColumnType
  title: string
  tasks: Task[]
  color: string
  activeId: string | null
}

function KanbanColumn({
  id,
  title,
  tasks,
  color,
  activeId,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div className="kanban-column">
      <div className="column-header" style={{ borderTopColor: color }}>
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="column-content">
          {tasks.map((task) => (
            <KanbanTask key={task.id} task={task} isActive={activeId === task.id} />
          ))}
          {tasks.length === 0 && (
            <div className="empty-column">No tasks</div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

type KanbanTaskProps = {
  task: Task
  isActive: boolean
}

function KanbanTask({ task, isActive }: KanbanTaskProps) {
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
      className={`kanban-task ${isDragging ? 'dragging' : ''} ${isActive ? 'active' : ''}`}
      {...attributes}
      {...listeners}
    >
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
    </div>
  )
}

export default KanbanColumn

