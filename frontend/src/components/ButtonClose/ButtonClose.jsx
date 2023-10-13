import './ButtonClose.scss'
import Close from '../../assets/images/ButtonClose.svg'

function ButtonClose({ closeModal }) {
  return <img onClick={closeModal} className="button-close" src={Close} alt="Закрыть" />
}

export default ButtonClose
