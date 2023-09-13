import { useEffect, useState } from 'react';
import './ButtonOrder.scss'

const ButtonOrder = () => {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
      window.addEventListener("scroll", () => {
          if (window.scrollY > 2700) {
            setShowBtn(true);
          } else {
            setShowBtn(false);
          }
      });
  }, []);
  const goToShowBtn = () => {
      window.scrollTo({
          top: 1050,
          behavior: "smooth",
      });
    }
    return (
        <>  {showBtn && (
            <button onClick={goToShowBtn} className="button__order button__order_position">Заказать уборку</button>
        )} 
        </>
    );
};

export default ButtonOrder;