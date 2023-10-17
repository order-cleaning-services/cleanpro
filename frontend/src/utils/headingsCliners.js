import { handleClickCliners, handleClickSchedule } from '../store/admin/adminSlice'

export const headings = [
  {
    id: 1,
    title: 'Клинеры',
    handleClick: handleClickCliners(),
    handleTab: 'cliners',
  },
  {
    id: 2,
    title: 'График работы',
    handleClick: handleClickSchedule(),
    handleTab: 'schedule',
  },
]
