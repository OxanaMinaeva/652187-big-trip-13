import {createElement} from "../utils.js";
import dayjs from "dayjs";

const createTripInfoTemplate = (destinations, dates) => {
  return `<div class="trip-main">
            <section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${destinations.length > 3 ? destinations[0] + ` -...- ` + destinations.pop() : destinations.join(` - `)}</h1>

                <p class="trip-info__dates">${dayjs(dates[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(dates.pop()).format(`MMM DD`)}</p>
              </div>`;
};

export default class TripInfo {
  constructor(destinations, dates) {
    this._destinations = destinations;
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._destinations, this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
