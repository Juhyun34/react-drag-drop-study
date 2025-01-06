import { useBasicDragDrop } from '../hooks/useBasicDragDrop'
import './BasicDragDrop.css'

function BasicDragDrop() {
  const {
    items,
    droppedItems,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleRemove,
    handleReset,
  } = useBasicDragDrop()

  return (
    <div className="basic-drag-drop">
      <div className="example-info">
        <h2>HTML5 Drag & Drop API</h2>
        <p>
          브라우저 기본 API로 구현한 드래그 앤 드롭
          <br />
          왼쪽 아이템을 드래그해서 오른쪽으로 옮겨보기
        </p>
      </div>

      <div className="basic-container">
        <div className="source-area">
          <h3>Items</h3>
          <div className="items-list">
            {items.map((item) => (
              <div
                key={item.id}
                className="draggable-item"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                style={{ backgroundColor: item.color }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h3>Drop Zone</h3>
          {droppedItems.length === 0 ? (
            <div className="drop-placeholder">
              여기로 드래그하세요
            </div>
          ) : (
            <div className="dropped-items">
              {droppedItems.map((item) => (
                <div
                  key={item.id}
                  className="dropped-item"
                  style={{ backgroundColor: item.color }}
                >
                  {item.text}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>
    </div>
  )
}

export default BasicDragDrop

