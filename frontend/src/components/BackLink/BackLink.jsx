import './BackLink.scss'

import back from '../../images/arrow-back.svg'

function BackLink({ onClick }) {
  return (
    <div className="back text-m" onClick={onClick}>
      <img className="back__arrow" src={back} alt="Назад" />
      Назад
    </div>
  )
}

export default BackLink
