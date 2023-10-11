const getAdminNavLink = state => state.admin.linkView
const getAdminTab = state => state.admin.tab
const getStatusExtra = state => state.admin.extra
const getDataClient = state => state.admin.dataClient

export const adminSelectors = { getAdminNavLink, getAdminTab, getStatusExtra, getDataClient }
