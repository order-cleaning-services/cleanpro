import './UploadButton.scss'

function UploadButton({ text }) {
  return (
    <button type="text" className="upload text-m">
      {text}
    </button>
  )
}

export default UploadButton
