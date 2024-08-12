import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { LightenDarkenColor } from 'lighten-darken-color';
import SpAdvEventDetailsModal from '../ui/shared/modals/SpAdvEventDetailsModal';
import { EventsData } from '../../data/eventsData';
import SingleEvent from './singleEvent';
function EventCalendar() {
  const localizer = momentLocalizer(moment);
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState();
  opacity: 0.20000000298023224;
  const eventStyleGetterh = (event) => {
    console.log(event);
    var Color = '#' + event.hexColor;
    var style = {
      backgroundColor: LightenDarkenColor(Color, 99.9),
      color: Color,
      borderLeft: `4px solid ${Color}`,
      display: 'block',
      fontWeight: '600',
      borderRadius: '0',
      padding: '2px 6px',
      fontSize: '12px',
    };
    return {
      style: style,
    };
  };

  return (
    <>
      <div className="flex flex-wrap justify-start py-6">
        <div className=" border-l-lava-100 text-darkGunmetal-200 font-spAdvSemiBold pl-3 text-sm font-semibold leading-5 tracking-wider border-l-4">
          Calendar
        </div>
        <div className="text-darkGunmetal-200 font-spAdvRegular my-5 text-base font-normal leading-6">
          Elementum ullamcorper sed phasellus massa elit turpis eu id varius.
          Diam vestibulum egestas turpis mattis. In praesent lectus eget
          volutpat massa. Tortor purus iaculis consequat, erat nec euismod
          tempus porttitor. Mauris aliquam pharetra in facilisis donec nec, sed
          sit. Nunc, sed amet adipiscing tincidunt sollicitudin tellus platea.
        </div>
      </div>
      <div className="flex pb-6">
        <div className="lg:w-1/5 h-full p-4">
          <div className="shadow-outline-xs rounded-2xl flex flex-col py-4 mb-4">
            <div className="text-darkGunmetal-600 font-spAdvSemiBold mb-4 text-lg font-semibold leading-7 text-center">
              Event Dates
            </div>
            <div className="flex flex-col">
              {EventsData.map((data, index) => (
                <SingleEvent item={data} key={index} />
              ))}
            </div>
          </div>
          <div className="shadow-outline-xs rounded-2xl flex flex-col px-8 py-6 space-y-4">
            <div className=" text-darkGunmetal-600 font-spAdvSemiBold text-lg font-semibold leading-7">
              Listing Legend
            </div>
            <div className=" font-spAdvRegular text-base font-normal text-black">
              <span className="sp-adv-dot bg-cetaceanBlue-200 mr-2"></span>
              Listing Last Chance
            </div>
          </div>
        </div>
        <div className="lg:w-4/5 h-full p-4">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={EventsData}
            style={{ height: '100vh' }}
            onSelectEvent={(slotInfo) => {
              setSelectedEvent(slotInfo);
              setShowEventDetails(true);
            }}
            eventPropGetter={(event) => eventStyleGetterh(event)}
            className="sp-adv-calendar"
          />
          {showEventDetails && (
            <SpAdvEventDetailsModal
              show={showEventDetails}
              item={selectedEvent}
              handleCloseParent={() => {
                setShowEventDetails(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EventCalendar;
