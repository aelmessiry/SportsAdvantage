import moment from 'moment';
import { eventPlaceHolder } from '../assets/images';
export const EventsData = [
  {
    start: moment('08-21-2023 10:00 AM').toDate(),
    end: moment('08-21-2023 12:00 AM').toDate(),
    title: 'Carrera Cup',
    hexColor: 'C59F59',
    description: 'Pellentesque nullam a sed cum orci amet et, metus lorem.',
    location: 'Italy',
    trackCondition: 'Clean',
    weatherCondition: 'Sunny',
    seasonId: 'Mobile1',
    image: eventPlaceHolder,
  },
  {
    start: moment('08-23-2023 10:00 AM').toDate(),
    end: moment('08-23-2023 12:00 AM').toDate(),
    title: 'Porsche  Mobil 1',
    hexColor: 'C59F59',
    description: 'Pellentesque nullam a sed cum orci amet et, metus lorem.',
    location: 'Italy',
    trackCondition: 'Clean',
    weatherCondition: 'Sunny',
    seasonId: 'Mobile1',
    image: eventPlaceHolder,
  },
  {
    start: moment('08-04-2023 10:00 AM').toDate(),
    end: moment('08-04-2023 12:00 AM').toDate(),
    title: 'Race Cup',
    hexColor: 'D91118',
    description: 'Pellentesque nullam a sed cum orci amet et, metus lorem.',
    location: 'Italy',
    trackCondition: 'Clean',
    weatherCondition: 'Sunny',
    seasonId: 'Mobile1',
    image: eventPlaceHolder,
  },
];
