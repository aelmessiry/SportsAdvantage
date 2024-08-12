import { team } from '../assets/images';
import { MyAdSpotsStatus } from '../Enum/myAdSpotsStatus';
import { tokenType } from '../Enum/tokenType';
export const MyListingData: any = [
  {
    id: 1,
    name: '4a - Left Door',
    team: 'Fach Auto | Car #1',
    date: '2022-03-25',
    image: team,
    price: '2.62',
    listingPrice: '4.62',
    status: MyAdSpotsStatus.Empty,
    currency: tokenType.Casper,
  },
];
