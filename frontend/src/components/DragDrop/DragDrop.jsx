import './DragDrop.scss'

import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ['JPG', 'PNG', 'GIF', 'SVG', 'GIF', 'JPEG']

function DragDrop() {
  const [file, setFile] = useState(null)
  const handleChange = () => {
    setFile(file)
  }
  return (
    <FileUploader
      classes="drag-drop"
      required={true}
      label={'+ Загрузить фото '}
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    />
  )
}

export default DragDrop
