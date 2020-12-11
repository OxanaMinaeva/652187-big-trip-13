import dayjs from "dayjs";
import {generateEvent} from "./mock/event.js";

import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import EditPointView from "./view/edit-point.js";
import FullOfferView from "./view/full-offer.js";
import TripCostView from "./view/trip-cost.js";
import TripEventView from "./view/trip-event.js";
import TripInfoView from "./view/trip-info.js";
import TripSortView from "./view/trip-sort.js";

import {render, RenderPosition, replace} from "./utils/render.js";


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


render(siteEventElement, new TripSortView(), RenderPosition.AFTERBEGIN);

// Рендер точки маршрута и редактирования
const renderEvent = (event) => {
  const tripEventComponent = new TripEventView(event);
  const tripEventEditComponent = new EditPointView(event);
  const tripEventOfferComponent = new FullOfferView(event);

  render(siteEventElement, tripEventComponent, RenderPosition.BEFOREEND);

  const replaceEventToEdit = () => {
    replace(tripEventEditComponent, tripEventComponent);
    render(tripEventEditComponent.getElement().querySelector(`.event--edit`), tripEventOfferComponent, RenderPosition.BEFOREEND);
  };

  const replaceEditToEvent = () => {
    replace(tripEventComponent, tripEventEditComponent);
  };

  // Обработчики Start
  tripEventComponent.setRollupClickHandler(() => {
    replaceEventToEdit();
  });

  tripEventEditComponent.setRollupClickHandler(() => {
    replaceEditToEvent();
  });

  tripEventEditComponent.setSubmitHandler(() => {
    replaceEditToEvent();
  });
  // Обработчики End

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

render(siteMainElement, new TripCostView(cost), RenderPosition.AFTERBEGIN);
render(siteMainElement, new TripInfoView(destinations, dates), RenderPosition.AFTERBEGIN);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new FilterView(), RenderPosition.BEFOREEND);
