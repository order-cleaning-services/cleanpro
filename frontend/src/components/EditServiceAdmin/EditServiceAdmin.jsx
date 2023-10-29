import '../GridAdmin/GridAdmin.scss'

import BackLink from '../BackLink/BackLink'
import Package from '../Package/Package'
import ServicesTitle from '../ServicesTitle/ServicesTitle'

function EditServiceAdmin({ item, onClick }) {
  return (
    <div className="edit-service">
      <BackLink onClick={onClick} />
      <ServicesTitle title={item.title} />
      <Package item={item} />
    </div>
  )
}

export default EditServiceAdmin
