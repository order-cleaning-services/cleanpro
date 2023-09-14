import './TextArea.scss'

function TextArea({ NameTextArea, placeHolder }) {
  return <textarea name={NameTextArea} placeholder={placeHolder} className="textarea"></textarea>
}

export default TextArea
