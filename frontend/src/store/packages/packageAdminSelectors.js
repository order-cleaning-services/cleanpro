const getPackagesItem = state => state.packages.dataPackage
const getPackages = state => state.packages.packageItem
const getStateModal = state => state.packages.stateModal
const getUnit = state => state.packages.unit
const getIdPackage = state => state.packages.idPackage
const getIdServiceItem = state => state.packages.idServiceItemEdit
const getIdServiceItemNew = state => state.packages.idServiceItemNew
const getPackagesList = state => state.packages.packages
const getEditPackage = state => state.packages.editPackage
const getNewPackage = state => state.packages.newPackage

export const packageAdminSelectors = {
  getPackagesItem,
  getPackages,
  getStateModal,
  getUnit,
  getIdPackage,
  getIdServiceItem,
  getIdServiceItemNew,
  getPackagesList,
  getEditPackage,
  getNewPackage,
}
