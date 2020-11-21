import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createEditPointTemplate} from "./view/edit-point.js";
import {createNewPointTemplate} from "./view/new-point.js";
import {createTripEventTemplate} from "./view/trip-event.js";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);

const siteBodyElement = document.querySelector(`.page-body__page-main`);
const siteEventElement = siteBodyElement.querySelector(`.trip-events`);

render(siteMainElement, createTripCostTemplate(), `afterbegin`);
render(siteMainElement, createTripInfoTemplate(), `afterbegin`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteHeaderElement, createFilterTemplate(), `beforeend`);

render(siteEventElement, createTripSortTemplate(), `afterbegin`);
render(siteEventElement, createEditPointTemplate(), `beforeend`);
render(siteEventElement, createNewPointTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteEventElement, createTripEventTemplate(), `beforeend`);
}
