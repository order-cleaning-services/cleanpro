import './DragDrop.scss'

import { useState, useEffect } from 'react'

function DragDrop() {
  const [drag, setDrag] = useState(false)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!file) {
      return
    }
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }, [file])

  function updateImage(e) {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0])
    } else {
      setFile(null)
    }
  }

  function onChange(e) {
    updateImage(e)
    setDrag(false)
  }

  function dragStartHandler(e) {
    e.preventDefault()
    setDrag(true)
  }
  function dragStartLeave(e) {
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler(e) {
    e.preventDefault()
    const transferredFiles = e.dataTransfer.files
    ;[...transferredFiles].forEach(transferredFile => {
      if (!/^image/.test(transferredFile.type)) {
        console.log('Выбранный файл не является изображением!')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(transferredFile)
      reader.addEventListener('error', () => {
        console.error(`Произошла ошибка при чтении файла: ${transferredFile.name}`)
        return
      })
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
    })
    setDrag(false)
  }

  return (
    <div className="drag-drop">
      {drag ? (
        <div
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragStartLeave(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}
          className="drag-drop__area">
          <span className="drag-drop__span text-s">Отпустите</span>
        </div>
      ) : (
        <div
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragStartLeave(e)}
          onDragOver={e => dragStartHandler(e)}
          className="drag-drop__area">
          <label htmlFor="preview" className="drag-drop__file">
            <input
              onChange={onChange}
              type="file"
              id="preview"
              className="drag-drop__input"
              multiple={false}
              accept="image/jpeg,image/jpg,image/png,image/svg, image/webp"
            />
            <span className="drag-drop__span">+</span>
            <span className="drag-drop__span">Загрузить фото</span>
            {previewUrl !== null && <img src={previewUrl} alt="" className="drag-drop__preview" />}
          </label>
        </div>
      )}
    </div>
  )
}

export default DragDrop
