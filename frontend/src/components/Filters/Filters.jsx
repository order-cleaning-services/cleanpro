import Checkbox from '../Checkbox/Checkbox'
import InputFilters from '../InputFilters/InputFilters'
import './Filters.scss'

function Filters({ stateVisible }) {
  return (
    <div>
      {stateVisible === true && (
        <div className="filters">
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
        </div>
      )}
    </div>
  )
}

export default Filters
