export const createFullOfferTemplate = (event) => {
  const {description, offers: {title, value}} = event;

  return `<section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">

                <div class="event__offer-selector ${title ? `` : `visually-hidden`}">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                  <label class="event__offer-label" for="event-offer-luggage-1">
                    <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${value}</span>
                  </label>
                </div>
                
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>
            </section>
          </section>`;
};
