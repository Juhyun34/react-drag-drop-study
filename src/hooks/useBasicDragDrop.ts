import { useState } from 'react'
import type { Item } from '../types/basicDragDrop'
import { INITIAL_ITEMS } from '../constants/basicDragDrop'

export function useBasicDragDrop() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS)
  const [droppedItems, setDroppedItems] = useState<Item[]>([])

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'move'
    ;(e.target as HTMLElement).style.opacity = '0.5'
  }

  const handleDragEnd = (e: React.DragEvent) => {
    ;(e.target as HTMLElement).style.opacity = '1'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const itemData = e.dataTransfer.getData('application/json')
    if (itemData) {
      try {
        const item: Item = JSON.parse(itemData)
        setDroppedItems((prev) => [...prev, item])
        setItems((prev) => prev.filter((i) => i.id !== item.id))
      } catch (error) {
        console.error('Failed to parse dropped item:', error)
      }
    }
  }

  const handleRemove = (itemId: string) => {
    const item = droppedItems.find((i) => i.id === itemId)
    if (item) {
      setDroppedItems((prev) => prev.filter((i) => i.id !== itemId))
      setItems((prev) => [...prev, item])
    }
  }

  const handleReset = () => {
    setDroppedItems([])
    setItems([...INITIAL_ITEMS])
  }

  return {
    items,
    droppedItems,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleRemove,
    handleReset,
  }
}

