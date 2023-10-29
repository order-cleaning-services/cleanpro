import './UnitSelect.scss'

import { useEffect, useState, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { packageAdminSelectors } from '../../store/packages/packageAdminSelectors'
import { initialUnit, addUnit } from '../../store/packages/packageAdminSlice'

import UnitModal from '../Modal/UnitModal/UnitModal'

import arrowDown from '../../images/chevron-down-gray.svg'
import arrowUp from '../../images/chevron-up-gray.svg'

function UnitSelect() {
  const initUnit = useSelector(packageAdminSelectors.getUnit)
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [modalState, setModalState] = useState(false)
  const [visible, setVisible] = useState(false)
  const [valueObj, setValueObj] = useState(initUnit)
  const [values, setValues] = useState('')

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(!visible)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  useEffect(() => {
    dispatch(initialUnit(initUnit))
  }, [])

  const handleInputChange = value => {
    setValues(value)
  }

  function displaying() {
    let el = values
    let findEl = valueObj.find(item => item == el)
    if (el === '') {
      return
    } else if (findEl !== el) {
      setValueObj([...valueObj, el])
      dispatch(addUnit(valueObj))
    }
  }

  useEffect(() => {
    dispatch(initialUnit(valueObj))
  }, [valueObj])

  function handleClickLink() {
    setModalState(!modalState)
  }

  function handleSubmit(e) {
    e.preventDefault()
    displaying()
    handleClickLink()
  }

  return (
    <div className="unit-select dropdown">
      {visible === false && <img className="dropdown__arrow" src={arrowDown} alt="Вниз" />}

      <button
        onClick={e => {
          e.preventDefault()
          setVisible(true)
        }}
        type="text"
        className="dropdown__button text-s">
        {values}
      </button>
      {visible === true && (
        <div ref={ref} className="dropdown__items dropdown__items">
          <img className={`dropdown__arrow`} src={arrowUp} alt="Вниз" />
          <p onClick={() => setVisible(!visible)} className="dropdown__item text-s">
            Выбрать
          </p>
          <ul className="dropdown__list">
            <li
              data-value="комната"
              onClick={() => {
                setVisible(false)
                setValues('комната')
              }}
              className={`dropdown__list-item ${values === 'комната' ? 'dropdown__list-item_active' : ''} text-s`}>
              комната
            </li>
            <li
              data-value="мин"
              onClick={() => {
                setVisible(false)
                setValues('мин')
              }}
              className={`dropdown__list-item ${values === 'мин' ? 'dropdown__list-item_active' : ''} text-s`}>
              мин
            </li>
            <li
              onClick={() => {
                setVisible(false)
                setValues('шт')
              }}
              className={`dropdown__list-item ${values === 'шт' ? 'dropdown__list-item_active' : ''} text-s`}>
              шт
            </li>
            <li
              onClick={() => {
                setVisible(false)
                setValues('л')
              }}
              className={`dropdown__list-item ${values === 'л' ? 'dropdown__list-item_active' : ''} text-s`}>
              л
            </li>
            <li
              onClick={() => {
                setVisible(false)
                setValues('м')
              }}
              className={`dropdown__list-item ${values === 'м' ? 'dropdown__list-item_active' : ''} text-s`}>
              м
            </li>
            <li
              onClick={() => {
                setVisible(false)
                setValues('м2')
              }}
              className={`dropdown__list-item ${values === 'м2' ? 'dropdown__list-item_active' : ''} text-s`}>
              m<sup>2</sup>
            </li>
            <li
              onClick={() => {
                setVisible(false)
                setValues('м3')
              }}
              className={`dropdown__list-item ${values === 'м3' ? 'dropdown__list-item_active' : ''} text-s`}>
              m<sup>3</sup>
            </li>
            {initUnit.map((item, index) => {
              return (
                <>
                  <li
                    key={index}
                    onClick={() => {
                      setValues(item)
                    }}
                    data-value={item}
                    className="dropdown__list-item text-s">
                    {item}
                  </li>
                </>
              )
            })}
          </ul>

          <p onClick={handleClickLink} className="dropdown__list-link text-s">
            <span className="dropdown__span">+</span>&#160;&#160; Новая единица
          </p>
        </div>
      )}

      <input name="select-unit" type="text" className="dropdown__input-hidden" value={values} />

      {modalState === true && (
        <UnitModal title="Новая единица измерения" onInputChange={handleInputChange} onClick={handleSubmit} />
      )}
    </div>
  )
}

export default UnitSelect
