import { packageItem } from '../../utils/adminData'
import { initialService } from '../../utils/initialData'

export const initialState = {
  dataPackage: [],
  dataCount: false,
  packageItem: packageItem,
  stateModal: false,
  unit: [],
  idPackage: null,
  idServiceItemEdit: null,
  idServiceItemNew: null,
  packages: initialService,
  editPackage: [],
  newPackage: [],
}
