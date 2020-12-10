import AbstractView from "./abstract.js";
import dayjs from "dayjs";

const createTripInfoTemplate = (destinations, dates) => {
  return `<div class="trip-main">
            <section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${destinations.length > 3 ? destinations[0] + ` -...- ` + destinations.pop() : destinations.join(` - `)}</h1>

                <p class="trip-info__dates">${dayjs(dates[0]).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(dates.pop()).format(`MMM DD`)}</p>
              </div>`;
};

export default class EditPoint extends AbstractView {
  constructor(destinations, dates) {
    super();
    this._destinations = destinations;
    this._dates = dates;
  }
  getTemplate() {
    return createTripInfoTemplate(this._destinations, this._dates);
  }
}
