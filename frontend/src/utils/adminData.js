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

export const packagesServices = [
  {
    id: 1,
    title: 'Поддерживающая',
    servicesTitle: 'Количество услуг',
    quantity: 12,
    timeTitle: 'Время',
    time: '2ч 30',
    priceTitle: 'Стоимость',
    price: '5000 ₽',
  },
  {
    id: 2,
    title: 'Генеральная',
    servicesTitle: 'Количество услуг',
    quantity: 12,
    timeTitle: 'Время',
    time: '2ч 30',
    priceTitle: 'Стоимость',
    price: '5000 ₽',
  },
  {
    id: 3,
    title: 'После ремонта',
    servicesTitle: 'Количество услуг',
    quantity: 12,
    timeTitle: 'Время',
    time: '2ч 30',
    priceTitle: 'Стоимость',
    price: '5000 ₽',
  },
  {
    id: 4,
    title: 'После праздника',
    servicesTitle: 'Количество услуг',
    quantity: 12,
    timeTitle: 'Время',
    time: '2ч 30',
    priceTitle: 'Стоимость',
    price: '5000 ₽',
  },
  {
    id: 5,
    title: 'Окна',
    servicesTitle: 'Количество услуг',
    quantity: 12,
    timeTitle: 'Время',
    time: '2ч 30',
    priceTitle: 'Стоимость',
    price: '5000 ₽',
  },
]

export const titlesList = ['Услуги', 'Стоимость', 'Единица', 'Время,мин', 'Тип', '']

export const packageItem = [
  { id: 101, name: 'Пылесосим', price: 400, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  { id: 102, name: 'Протираем мебель от пыли', price: 300, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  { id: 103, name: 'Выносим мусор', price: 200, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  { id: 104, name: 'Моем зеркала и стекла', price: 200, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  { id: 105, name: 'Протираем бытовую технику', price: 400, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  {
    id: 106,
    name: 'Моем горизонтальные поверхности',
    price: 400,
    unit: 'Комната',
    time: 10,
    type: 'Основная',
    button: '+',
  },
  { id: 107, name: 'test1', price: 400, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
  { id: 108, name: 'test2', price: 400, unit: 'Комната', time: 10, type: 'Основная', button: '+' },
]
