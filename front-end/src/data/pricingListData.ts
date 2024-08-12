import { nft } from '../assets/images';

export const PricingListData: any = [
  {
    id: 1,
    title: 'Pro',
    subTitle: 'Vestibulum viverra in ac in ut cursus nisl et ',
    features: [
      'Hac sed adipiscing purus praesent ornare nisl.',
      'Proin sed mi amet hendrerit.',
      'Est venenatis cursus est sagittis a id aliquet.',
    ],
    purchase: '25',
    priceInUSD: '$ 27,657.00 USD',
    color: '#131444', //theme.colors['cetaceanBlue.100'],
  },
  {
    id: 2,
    title: 'Premium',
    subTitle: 'Malesuada quis vitae nisl tristique ',
    features: [
      'Sit porta pellentesque at nibh porttitor vitae pharetra, rutrum a.',
      'Cras mattis nisl consectetur et facilisi mattis vel, habitant lacus.',
      'Nam scelerisque faucibus nunc cursus ',
      'Sagittis mi augue commodo odio fringilla vitae aliquam, ullamcorper.',
      'Sapien ornare pellentesque diam ac tellus facilisis viverra mauris.',
    ],
    purchase: '65',
    priceInUSD: '$ 71,908.20 USD',
    color: '#D91118', //theme.colors['lava.100'],
  },
  {
    id: 3,
    title: 'Elite',
    subTitle: 'Experience Unmatched Excellence',
    features: [
      'Title Sponsorship',
      'Unprecedented Access:',
      'Worldwide Exposure',
      'Tailored Perfection',
    ],
    purchase: '100',
    priceInUSD: '€ 1500000 EURO',
    color: '#C59F59', //theme.colors['aztecGold.100'],
    image: nft,
  },
];
