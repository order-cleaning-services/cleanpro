import { useEffect, useState } from 'react'
import './ButtonOrder.scss'
import { HashLink } from 'react-router-hash-link'

const ButtonOrder = ({ height }) => {
  const [showBtn, setShowBtn] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > height) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    })
  }, [])
  // const goToShowBtn = () => {
  //     window.scrollTo({
  //         top: 1050,
  //         behavior: "smooth",
  //     });
  //   }
  return (
    <>
      {' '}
      {showBtn && (
        <HashLink to="/#calculator">
          <button className="button__order button__order_position">Заказать уборку</button>
        </HashLink>
      )}
    </>
  )
}

export default ButtonOrder
