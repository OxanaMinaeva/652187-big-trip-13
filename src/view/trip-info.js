export const createTripInfoTemplate = (destinations, dates) => {
  let info;
  let startDate;
  let endDate;

  if (destinations.length > 3) {
    info = destinations[0] + ` - ` + destinations.pop();
    startDate = dates[0];
    endDate = dates.pop();
  }
  return `<div class="trip-main">
            <section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${info}</h1>

                <p class="trip-info__dates">${startDate.format(`MMM DD`)}&nbsp;&mdash;&nbsp;${endDate.format(`MMM DD`)}</p>
              </div>`;
};
