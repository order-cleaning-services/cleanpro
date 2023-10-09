import './Headings.scss'

import { useSelector } from 'react-redux'
import { adminSelectors } from '../../store/admin/adminSelectors'

function Headings({ onClick, title, count, tab }) {
  const viewTab = useSelector(adminSelectors.getAdminTab)

  return (
    <div className={`headings__item ${tab === viewTab && 'headings__title_active'}`}>
      <p className="headings__title text-l" onClick={onClick}>
        {title}
      </p>
      {count !== '' && <p className="headings__count">{count}</p>}
    </div>
  )
}

export default Headings
