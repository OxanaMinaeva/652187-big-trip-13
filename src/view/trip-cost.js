import AbstractView from "./abstract.js";

const createTripCostTemplate = (cost) => {
  return `<p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
              </p>`;
};

export default class TripCost extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }
  getTemplate() {
    return createTripCostTemplate(this._event);
  }
}
