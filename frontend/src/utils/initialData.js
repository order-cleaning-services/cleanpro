import hoover from "../assets/images/hoover.jpg"
import bucket from "../assets/images/bucket.jpg"
import floorLamp from "../assets/images/floorLamp.jpg"
import sprayer from "../assets/images/sprayer.jpg"
import oven from "../assets/images/oven.jpg"
import garbage from "../assets/images/garbage.jpg"
import cleanDust from "../assets/images/cleanDust.jpg"
import kitchen from "../assets/images/kitchen.jpg"
import toilet from "../assets/images/toilet.jpg"
import sofa from "../assets/images/sofa.jpg"

export const serviceCards = [
  {
    type: "maintenance",
    title: "Поддерживающая",
    cards: [
      { content: "Пылесосим", img: hoover },
      { content: "Протираем от пыли торшеры и бра", img: floorLamp },
      { content: "Моем пол и плинтусы", img: bucket },
      { content: "Моем зеркала и стеклянные поверхности", img: sprayer },
      { content: "Протираем бытовую технику", img: oven },
      { content: "Выносим мусор", img: garbage },
      { content: "Моем горизонтальные поверхности", img: cleanDust },
      { content: "Моем плиту, раковину и посуду", img: kitchen },
      { content: "Убираем санузел", img: toilet },
      { content: "Аккуратно протираем мебель от пыли", img: sofa },
    ],
  },
  {
    type: "general",
    title: "Генеральная",
    cards: [
      { content: "Пылесосим", img: hoover },
      { content: "Протираем от пыли торшеры и бра", img: floorLamp },
      { content: "Моем пол и плинтусы", img: bucket },
      { content: "Моем зеркала и стеклянные поверхности", img: sprayer },
      { content: "Протираем бытовую технику", img: oven },
      { content: "Выносим мусор", img: garbage },
      { content: "Моем горизонтальные поверхности", img: cleanDust },
      { content: "Моем плиту, раковину и посуду", img: kitchen },
      { content: "Убираем санузел", img: toilet },
      { content: "Аккуратно протираем мебель от пыли", img: sofa },
    ],
  },
  {
    type: "afterRenovation",
    title: "После ремонта",
    cards: [
      { content: "Пылесосим", img: hoover },
      { content: "Протираем от пыли торшеры и бра", img: floorLamp },
      { content: "Моем пол и плинтусы", img: bucket },
      { content: "Моем зеркала и стеклянные поверхности", img: sprayer },
      { content: "Протираем бытовую технику", img: oven },
      { content: "Выносим мусор", img: garbage },
      { content: "Моем горизонтальные поверхности", img: cleanDust },
      { content: "Моем плиту, раковину и посуду", img: kitchen },
      { content: "Убираем санузел", img: toilet },
      { content: "Аккуратно протираем мебель от пыли", img: sofa },
    ],
  },
  {
    type: "afterEvent",
    title: "После праздника",
    cards: [
      { content: "Пылесосим", img: hoover },
      { content: "Моем пол и плинтусы", img: bucket },
      { content: "Моем зеркала и стеклянные поверхности", img: sprayer },
      { content: "Выносим мусор", img: garbage },
      { content: "Моем горизонтальные поверхности", img: cleanDust },
      { content: "Моем плиту, раковину и посуду", img: kitchen },
      { content: "Убираем санузел", img: toilet },
      { content: "Удаляем пыль с дверных проемов и дверей", img: toilet },
      { content: "Аккуратно протираем мебель от пыли", img: sofa },
    ],
  },
  {
    type: "windowCleaning",
    title: "Мытье окон",
    cards: [{ content: "Моем зеркала и стеклянные поверхности", img: sprayer }],
  },
]

export const extraServices = [
  { title: "Уборка балкона", price: 1000, maxCount: 5 },
  { title: "Мытье духовки внутри", price: 450, maxCount: 5 },
  { title: "Мытье окон", price: 450, maxCount: 5 },
  { title: "Мытье холодильника", price: 700, maxCount: 5 },
  { title: "Глажка", price: 500, maxCount: 5 },
  { title: "Мытье микроволновки", price: 800, maxCount: 5 },
]
