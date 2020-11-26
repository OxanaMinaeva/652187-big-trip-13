import dayjs from "dayjs";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createEditPointTemplate} from "./view/edit-point.js";
import {createNewPointTemplate} from "./view/new-point.js";
import {createTripEventTemplate} from "./view/trip-event.js";
import {createFullOfferTemplate} from "./view/full-offer.js";
import {generateEvent} from "./mock/event.js";

const TASK_COUNT = 20;
const FIRST_TASK = 1;
const events = new Array(TASK_COUNT).fill().map(generateEvent);
const destinations = [];
const dates = [];
let cost = 0;
const sortEvents = events.sort((a, b) => dayjs(a.date) > dayjs(b.date) ? 1 : -1);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);

const siteBodyElement = document.querySelector(`.page-body__page-main`);
const siteEventElement = siteBodyElement.querySelector(`.trip-events`);


render(siteEventElement, createTripSortTemplate(), `afterbegin`);
render(siteEventElement, createEditPointTemplate(sortEvents[0]), `beforeend`);

const siteEditElement = siteEventElement.querySelector(`.event--edit`);
render(siteEditElement, createFullOfferTemplate(sortEvents[0]), `beforeend`);
render(siteEventElement, createNewPointTemplate(sortEvents[1]), `beforeend`);


for (let i = FIRST_TASK; i < TASK_COUNT; i++) {
  render(siteEventElement, createTripEventTemplate(sortEvents[i]), `beforeend`);
  cost += Number(sortEvents[i].price);
  destinations.push(sortEvents[i].destination);
  dates.push(sortEvents[i].date);
}

render(siteMainElement, createTripCostTemplate(cost), `afterbegin`);
render(siteMainElement, createTripInfoTemplate(destinations, dates), `afterbegin`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteHeaderElement, createFilterTemplate(), `beforeend`);


const rollupButton = siteEditElement.querySelector(`.event__rollup-btn`);
const resetButton = siteEditElement.querySelector(`.event__reset-btn`);

rollupButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  siteEditElement.remove();
});

resetButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  siteEditElement.remove();
});

siteEditElement.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  siteEditElement.remove();
});
