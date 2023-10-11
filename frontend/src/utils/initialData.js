import hoover from '../assets/images/hoover.jpg'
import bucket from '../assets/images/bucket.jpg'
import floorLamp from '../assets/images/floorLamp.jpg'
import sprayer from '../assets/images/sprayer.jpg'
import oven from '../assets/images/oven.jpg'
import garbage from '../assets/images/garbage.jpg'
import cleanDust from '../assets/images/cleanDust.jpg'
import kitchen from '../assets/images/kitchen.jpg'
import toilet from '../assets/images/toilet.jpg'
import sofa from '../assets/images/sofa.jpg'
import bust from '../assets/images/bust.jpg'
import curtains from '../assets/images/curtains.jpg'
import doors from '../assets/images/doors.jpg'
import wardrobe from '../assets/images/wardrobe.jpg'

export const serviceCards = [
  {
    id: 1,
    title: 'Поддерживающая',
    price: 5000,
    cards: [
      { id: 1, content: 'Пылесосим', img: hoover },
      { id: 2, content: 'Протираем от пыли торшеры и бра', img: floorLamp },
      { id: 3, content: 'Моем пол и плинтусы', img: bucket },
      { id: 4, content: 'Моем зеркала и стекла', img: sprayer },
      { id: 5, content: 'Протираем бытовую технику', img: oven },
      { id: 6, content: 'Выносим мусор', img: garbage },
      { id: 7, content: 'Моем горизонтальные поверхности', img: cleanDust },
      { id: 8, content: 'Моем плиту, раковину и посуду', img: kitchen },
      { id: 9, content: 'Убираем санузел', img: toilet },
      { id: 10, content: 'Аккуратно протираем мебель от пыли', img: sofa },
    ],
  },
  {
    id: 2,
    title: 'Генеральная',
    price: 8000,
    cards: [
      { id: 1, content: 'Пылесосим', img: hoover },
      { id: 2, content: 'Протираем от пыли торшеры и бра', img: floorLamp },
      { id: 3, content: 'Моем пол и плинтусы', img: bucket },
      { id: 4, content: 'Моем зеркала и стекла', img: sprayer },
      { id: 5, content: 'Протираем бытовую технику', img: oven },
      { id: 6, content: 'Выносим мусор', img: garbage },
      { id: 7, content: 'Моем горизонтальные поверхности', img: cleanDust },
      { id: 8, content: 'Моем плиту, раковину и посуду', img: kitchen },
      { id: 9, content: 'Убираем санузел', img: toilet },
      { id: 10, content: 'Аккуратно протираем мебель от пыли', img: sofa },
      { id: 10, content: 'Моем шкафы и ящики изнутри', img: wardrobe },
      {
        id: 10,
        content: 'Протираем антресоли, гардины и карнизы',
        img: curtains,
      },
      {
        id: 10,
        content: 'Удаляем пыль с дверных проемов',
        img: doors,
      },
      {
        id: 10,
        content: 'Протираем от пыли все предметы интерьера',
        img: bust,
      },
    ],
  },
  {
    id: 3,
    title: 'После ремонта',
    price: 9000,
    cards: [
      { id: 1, content: 'Пылесосим', img: hoover },
      { id: 2, content: 'Протираем от пыли торшеры и бра', img: floorLamp },
      { id: 3, content: 'Моем пол и плинтусы', img: bucket },
      { id: 4, content: 'Моем зеркала и стекла', img: sprayer },
      { id: 5, content: 'Протираем бытовую технику', img: oven },
      { id: 6, content: 'Выносим мусор', img: garbage },
      { id: 7, content: 'Моем горизонтальные поверхности', img: cleanDust },
      { id: 8, content: 'Моем плиту, раковину и посуду', img: kitchen },
      { id: 9, content: 'Убираем санузел', img: toilet },
      { id: 10, content: 'Аккуратно протираем мебель от пыли', img: sofa },
      {
        id: 11,
        content: 'Удаляем пыль с дверных проемов',
        img: doors,
      },
      {
        id: 12,
        content: 'Протираем от пыли все предметы интерьера',
        img: bust,
      },
    ],
  },
  {
    id: 4,
    title: 'После праздника',
    price: 6000,
    cards: [
      { id: 1, content: 'Пылесосим', img: hoover },
      { id: 2, content: 'Моем пол и плинтусы', img: bucket },
      { id: 3, content: 'Моем зеркала и стекла', img: sprayer },
      { id: 4, content: 'Выносим мусор', img: garbage },
      { id: 5, content: 'Моем горизонтальные поверхности', img: cleanDust },
      { id: 6, content: 'Моем плиту, раковину и посуду', img: kitchen },
      { id: 7, content: 'Убираем санузел', img: toilet },
      {
        id: 8,
        content: 'Удаляем пыль с дверных проемов',
        img: toilet,
      },
      { id: 9, content: 'Аккуратно протираем мебель от пыли', img: sofa },
    ],
  },
  {
    id: 5,
    title: 'Окна',
    price: 1500,
    cards: [
      { id: 1, content: 'Протираем окна с двух сторон' },
      { id: 2, content: 'Протираем от пыли оконные рамы' },
      { id: 3, content: 'Моем москитную сетку' },
    ],
  },
]

export const extraServices = [
  { id: 1, title: 'Уборка балкона', price: 1000, maxCount: 5, amount: 0 },
  { id: 2, title: 'Мытье духовки внутри', price: 450, maxCount: 5, amount: 0 },
  { id: 3, title: 'Мытье окон', price: 450, maxCount: 5, amount: 0 },
  { id: 4, title: 'Мытье холодильника', price: 700, maxCount: 5, amount: 0 },
  { id: 5, title: 'Глажка', price: 500, maxCount: 5, amount: 0 },
  { id: 6, title: 'Мытье микроволновки', price: 800, maxCount: 5, amount: 0 },
]

export const timeOptions = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
export const options = [
  { value: '09:00', label: '09 : 00' },
  { value: '10:00', label: '10 : 00' },
  { value: '11:00', label: '11 : 00' },
  { value: '12:00', label: '12 : 00' },
  { value: '13:00', label: '13 : 00' },
  { value: '14:00', label: '14 : 00' },
  { value: '15:00', label: '15 : 00' },
  { value: '16:00', label: '16 : 00' },
]

export const unit = [
  { value: 'комната', label: 'комната' },
  { value: 'шт', label: 'шт' },
  { value: '30 мин', label: '30 мин' },
]
