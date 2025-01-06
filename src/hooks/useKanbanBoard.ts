import { useState } from 'react'
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Task, ColumnType, Columns } from '../types/kanbanBoard'
import {
  INITIAL_COLUMNS,
  COLUMN_TITLES,
  COLUMN_COLORS,
} from '../constants/kanbanBoard'

export type { Task, ColumnType } from '../types/kanbanBoard'

export function useKanbanBoard() {
  const [columns, setColumns] = useState<Columns>(INITIAL_COLUMNS)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const findColumnByTaskId = (taskId: string): ColumnType | null => {
    for (const [column, tasks] of Object.entries(columns)) {
      if (tasks.some((task: Task) => task.id === taskId)) {
        return column as ColumnType
      }
    }
    return null
  }

  const findTaskById = (cols: Columns, taskId: string): Task | null => {
    for (const columnTasks of Object.values(cols)) {
      const task = columnTasks.find((t: Task) => t.id === taskId)
      if (task) return task
    }
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const isOverColumn = ['todo', 'inProgress', 'done'].includes(overId)
    if (isOverColumn) {
      const activeColumn = findColumnByTaskId(activeId)
      const overColumn = overId as ColumnType

      if (activeColumn && activeColumn !== overColumn) {
        setColumns((prev) => {
          const activeTask = findTaskById(prev, activeId)
          if (!activeTask) return prev

          return {
            ...prev,
            [activeColumn]: prev[activeColumn].filter(
              (task) => task.id !== activeId
            ),
            [overColumn]: [...prev[overColumn], activeTask],
          }
        })
      }
      return
    }

    const activeColumn = findColumnByTaskId(activeId)
    const overColumn = findColumnByTaskId(overId)

    if (activeColumn && overColumn && activeColumn !== overColumn) {
      setColumns((prev) => {
        const activeTask = findTaskById(prev, activeId)
        const overTask = findTaskById(prev, overId)
        if (!activeTask || !overTask) return prev

        const overIndex = prev[overColumn].findIndex((t) => t.id === overId)

        return {
          ...prev,
          [activeColumn]: prev[activeColumn].filter(
            (task) => task.id !== activeId
          ),
          [overColumn]: [
            ...prev[overColumn].slice(0, overIndex),
            activeTask,
            ...prev[overColumn].slice(overIndex),
          ],
        }
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeColumn = findColumnByTaskId(activeId)
    const isOverColumn = ['todo', 'inProgress', 'done'].includes(overId)

    if (isOverColumn) {
      const overColumn = overId as ColumnType
      if (activeColumn && activeColumn !== overColumn) {
        setColumns((prev) => {
          const activeTask = findTaskById(prev, activeId)
          if (!activeTask) return prev

          return {
            ...prev,
            [activeColumn]: prev[activeColumn].filter(
              (task) => task.id !== activeId
            ),
            [overColumn]: [...prev[overColumn], activeTask],
          }
        })
      }
    } else {
      const overColumn = findColumnByTaskId(overId)
      if (activeColumn && overColumn && activeColumn !== overColumn) {
        setColumns((prev) => {
          const activeTask = findTaskById(prev, activeId)
          const overTask = findTaskById(prev, overId)
          if (!activeTask || !overTask) return prev

          const overIndex = prev[overColumn].findIndex((t) => t.id === overId)

          return {
            ...prev,
            [activeColumn]: prev[activeColumn].filter(
              (task) => task.id !== activeId
            ),
            [overColumn]: [
              ...prev[overColumn].slice(0, overIndex),
              activeTask,
              ...prev[overColumn].slice(overIndex),
            ],
          }
        })
      } else if (activeColumn && overColumn && activeColumn === overColumn) {
        setColumns((prev) => {
          const activeIndex = prev[activeColumn].findIndex(
            (t) => t.id === activeId
          )
          const overIndex = prev[activeColumn].findIndex((t) => t.id === overId)

          if (activeIndex !== overIndex) {
            const newTasks = [...prev[activeColumn]]
            const [removed] = newTasks.splice(activeIndex, 1)
            newTasks.splice(overIndex, 0, removed)

            return {
              ...prev,
              [activeColumn]: newTasks,
            }
          }

          return prev
        })
      }
    }
  }

  return {
    columns,
    activeId,
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    columnTitles: COLUMN_TITLES,
    columnColors: COLUMN_COLORS,
  }
}

