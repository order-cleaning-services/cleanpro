import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'
import ButtonAdmin from '../ButtonAdmin/ButtonAdmin'
import Checkbox from '../Checkbox/Checkbox'
import InputFilters from '../InputFilters/InputFilters'
import './Filters.scss'
import CheckboxAll from '../CheckboxAll/CheckboxAll'

function Filters({ stateVisible }) {
  const adminNavLink = useSelector(adminSelectors.getAdminNavLink)

  return (
    <div>
      {stateVisible === true && (
        <form className="filters">
          <div className="filters__container">
            {adminNavLink === 'orders' && (
              <>
                <div className="filters__dates">
                  <div className="filters__registration">
                    <p className="filters__title text-m-bold">Дата оформления</p>
                    <div className="filters__inputs">
                      <InputFilters placeholder="c" />
                      <InputFilters placeholder="по" />
                    </div>
                  </div>
                  <div className="filters__cleaning">
                    <p className="filters__title text-m-bold">Дата уборки</p>
                    <div className="filters__inputs">
                      <InputFilters placeholder="c" />
                      <InputFilters placeholder="по" />
                    </div>
                  </div>
                </div>
                <div className="filters__services">
                  <p className="filters__title text-m-bold">Вид услуги</p>
                  <div className="filters__checkbox">
                    <Checkbox label="Поддерживающая" />
                    <Checkbox label="Генеральная" />
                    <Checkbox label="После ремонта" />
                    <Checkbox label="После праздника" />
                    <Checkbox label="Окна" />
                  </div>
                </div>
                <div className="filters__cancelled">
                  <p className="filters__title text-m-bold">Причина отмены</p>
                  <div className="filters__checkbox">
                    <Checkbox label="Изменились планы" />
                    <Checkbox label="Сделали уборку сами" />
                    <Checkbox label="Нашли другого клинера" />
                    <Checkbox label="Не могу изменить информацию о заказе" />
                  </div>
                </div>
                <div className="filters__more">
                  <div className="filters__price">
                    <p className="filters__title text-m-bold">Стоимость</p>
                    <div className="filters__inputs">
                      <InputFilters placeholder="от" />
                      <InputFilters placeholder="до" />
                    </div>
                  </div>
                  <div className="filters__extra">
                    <p className="filters__title text-m-bold">Дополнительные услуги</p>
                    <Checkbox label="Есть" />
                  </div>
                </div>
              </>
            )}
            {adminNavLink === 'services' && (
              <>
                <div className="filters__services">
                  <p className="filters__title text-m-bold">Тип уборки</p>
                  <div className="filters__radio">
                    <label>
                      <input className="filters__input" type="radio" name="Radio" value="Основная" />
                      Основная
                    </label>
                    <label>
                      <input className="filters__input" type="radio" name="Radio" value="Дополнительная" />
                      Дополнительная
                    </label>
                  </div>
                </div>
                <div className="filters__services">
                  <p className="filters__title text-m-bold">Присутствует в пакете</p>
                  <div className="filters__checkbox">
                    <CheckboxAll />
                  </div>
                </div>
                <div className="filters__price">
                  <p className="filters__title text-m-bold">Стоимость</p>
                  <div className="filters__inputs">
                    <InputFilters placeholder="от" />
                    <InputFilters placeholder="до" />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="filters__button">
            <ButtonAdmin text="Применить" />
          </div>
        </form>
      )}
    </div>
  )
}

export default Filters
