import './UploadButton.scss'
import del from '../../images/delete.svg'

function UploadButton({ text, onClick, style, visible, width }) {
  function handleClick() {
    onClick()
  }
  return (
    <button type="text" className={`upload ${style} ${width} text-m`} onClick={handleClick}>
      <img src={del} className={`upload__img upload__img_${visible}`} alt="" />
      {text}
    </button>
  )
}

export default UploadButton
