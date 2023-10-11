const getAdminNavLink = state => state.admin.linkView
const getAdminTab = state => state.admin.tab
const getAdminTabCleaners = state => state.admin.tabCleaners
const getStatusExtra = state => state.admin.extra
const getDataClient = state => state.admin.dataClient

export const adminSelectors = { getAdminNavLink, getAdminTab, getAdminTabCleaners, getStatusExtra, getDataClient }
