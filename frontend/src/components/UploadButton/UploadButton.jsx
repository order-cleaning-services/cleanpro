import './UploadButton.scss'

function UploadButton({ text, onClick }) {
  function handleClick() {
    onClick()
  }
  return (
    <button type="text" className="upload text-m" onClick={handleClick}>
      {text}
    </button>
  )
}

export default UploadButton
