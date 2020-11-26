import dayjs from "dayjs";
import {getRandomInteger, generateDate} from "../utils.js";

const FULL_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MAX_DESCRIPTION_LENGTH = 5;
const PRICES = [`100`, `200`, `120`, `50`];
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Flight`, `Drive`];
const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`];

const getRandomElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const getOfferTitle = (type) => {
  const titles = [];
  switch (type) {
    case `Taxi`:
    case `Bus`:
      titles.push(`Switch to comfort class`, `Add luggage`);
      break;
    case `Train`:
    case `Ship`:
      titles.push(`Add meal`, `Choose seats`);
      break;
    case `Flight`:
      titles.push(`Switch to comfort class`, `Add baggage`, `Add meal`, `Choose seats`, `Travel by train`);
      break;
    case `Drive`:
      titles.push(``);
      break;
  }
  return getRandomElement(titles);
};

// Массив Описаний точки маршрута
const getDescription = (text) => {
  const firstDescriptions = text.match(/[^\.]+[\.]/g);
  const secondDescriptions = [];
  for (let i = 0; i < MAX_DESCRIPTION_LENGTH; i++) {
    secondDescriptions.push(getRandomElement(firstDescriptions));
  }
  const descriptionSet = new Set(secondDescriptions);
  const uniqDescriptions = Array.from(descriptionSet).join(``);
  return uniqDescriptions;
};

const generateSchedule = () => {
  const MAX_TIME = 1440;
  const timesGap = getRandomInteger(0, MAX_TIME);
  const startTime = dayjs().add(timesGap, `minute`);
  const duration = getRandomInteger(0, MAX_TIME);
  const endTime = dayjs().add(timesGap + duration, `minute`);
  return {
    startTime,
    endTime,
    duration
  };
};

// Точка маршрута
export const generateEvent = () => {
  const type = getRandomElement(TYPES);
  return {
    type,
    destination: getRandomElement(DESTINATIONS),
    offers: {
      type,
      title: getOfferTitle(type),
      value: getRandomElement(PRICES)
    },
    description: getDescription(FULL_DESCRIPTION),
    typeIcon: `http://picsum.photos/248/152?r=${Math.random()}`,
    date: generateDate(),
    schedule: generateSchedule(),
    price: getRandomElement(PRICES),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
