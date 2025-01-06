export type Task = {
  id: string
  title: string
  description: string
}

export type ColumnType = 'todo' | 'inProgress' | 'done'

export type Columns = {
  todo: Task[]
  inProgress: Task[]
  done: Task[]
}

