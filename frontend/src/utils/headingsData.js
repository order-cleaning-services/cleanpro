import {
  handleClickNew,
  handleClickCurrent,
  handleClickCompleted,
  handleClickСancelled,
  handleClickCleaners,
  handleClickPackages,
} from '../store/admin/adminSlice'

export const headings = [
  {
    id: 1,
    title: 'Новые',
    count: '99',
    handleClick: handleClickNew(),
    handleTab: 'new',
  },
  {
    id: 2,
    title: 'Текущие',
    count: '',
    handleClick: handleClickCurrent(),
    handleTab: 'current',
  },
  {
    id: 3,
    title: 'Завершенные',
    count: '',
    handleClick: handleClickCompleted(),
    handleTab: 'completed',
  },
  {
    id: 4,
    title: 'Отмененные',
    count: '7',
    handleClick: handleClickСancelled(),
    handleTab: 'cancelled',
  },
]
export const headingsServices = [
  {
    id: 1,
    title: 'Услуги',
    count: '',
    handleClick: handleClickCleaners(),
    handleTab: 'services',
  },
  {
    id: 2,
    title: 'Пакеты услуг',
    count: '',
    handleClick: handleClickPackages(),
    handleTab: 'packages',
  },
]
