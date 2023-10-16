import '../OfficeAdmin/OfficeAdmin.scss'
import '../Headings/Headings.scss'
import './CleanersAdmin.scss'

import CleanersListAdmin from '../CleanersListAdmin/CleanersListAdmin'
import ButtonAdd from '../ButtonAdd/ButtonAdd'
import Headings from '../Headings/Headings'
import { headings } from '../../utils/headingsCliners'
import cleanersData from '../../utils/cleaningData'
import { useDispatch } from 'react-redux'
import { handleClickNewCleaner, handleClickCleanerCard } from '../../store/admin/adminSlice'

function CleanersAdmin() {
  const dispatch = useDispatch()

  return (
    <section className="office">
      <div className="headings">
        {headings.map(h => (
          <Headings key={h.id} count={''} onClick={() => dispatch(h.handleClick)} tab={h.handleTab} title={h.title} />
        ))}
      </div>
      <div className="cleaners-admin__wrapper">
        {cleanersData.map(cleaner => (
          <CleanersListAdmin
            key={cleaner.id}
            phone={cleaner.phone}
            img={cleaner.image}
            name={cleaner.name}
            onClick={() => dispatch(handleClickCleanerCard())}
          />
        ))}
      </div>
      <ButtonAdd text={'Добавить клинера'} onClick={() => dispatch(handleClickNewCleaner())} />
    </section>
  )
}

export default CleanersAdmin
