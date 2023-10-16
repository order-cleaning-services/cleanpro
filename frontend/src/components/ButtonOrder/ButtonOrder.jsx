import { useEffect, useState } from 'react'
import './ButtonOrder.scss'
import { HashLink } from 'react-router-hash-link'

const ButtonOrder = ({ height }) => {
  const [showBtn, setShowBtn] = useState(false)
  useEffect(() => {
    const callback = () => {
      if (window.scrollY > height) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    }

    window.addEventListener('scroll', callback)

    return () => window.removeEventListener('scroll', callback)
  }, [height])
  return (
    <>
      {showBtn && (
        <HashLink to="/#calculator">
          <button className="button__order button__order_position">Заказать уборку</button>
        </HashLink>
      )}
    </>
  )
}

export default ButtonOrder
