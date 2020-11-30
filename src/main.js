import dayjs from "dayjs";
import {generateEvent} from "./mock/event.js";

import {render, RenderPosition} from "./utils.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import EditPointView from "./view/edit-point.js";
import FullOfferView from "./view/full-offer.js";
import TripCostView from "./view/trip-cost.js";
import TripEventView from "./view/trip-event.js";
import TripInfoView from "./view/trip-info.js";
import TripSortView from "./view/trip-sort.js";


const TASK_COUNT = 20;
const events = new Array(TASK_COUNT).fill().map(generateEvent);
const destinations = [];
const dates = [];
let cost = 0;
const sortEvents = events.sort((a, b) => dayjs(a.date) > dayjs(b.date) ? 1 : -1);


const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);

const siteBodyElement = document.querySelector(`.page-body__page-main`);
const siteEventElement = siteBodyElement.querySelector(`.trip-events`);


render(siteEventElement, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);

// Рендер точки маршрута и редактирования
const renderEvent = (event) => {
  const tripEventComponent = new TripEventView(event);
  const tripEventEditComponent = new EditPointView(event);
  const tripEventOfferComponent = new FullOfferView(event);

  render(siteEventElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);

  const replaceEventToEdit = () => {
    siteEventElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
    render(tripEventEditComponent.getElement().lastElementChild.lastElementChild, tripEventOfferComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const replaceEditToEvent = () => {
    siteEventElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  tripEventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEventToEdit();
  });

  tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  tripEventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    replaceEditToEvent();
  });
};

const tripMainInfo = (event) => {
  cost += Number(event.price);
  destinations.push(event.destination);
  dates.push(event.date);
};

for (let i = 0; i < TASK_COUNT; i++) {
  renderEvent(sortEvents[i]);
  tripMainInfo(sortEvents[i]);
}

render(siteMainElement, new TripCostView(cost).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new TripInfoView(destinations, dates).getElement(), RenderPosition.AFTERBEGIN);

render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
