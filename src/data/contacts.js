const contacts = [
  {
    photo: '/images/profile.jpg',
    salutation: 'Mr.',
    firstName: 'Blake',
    lastName: 'Corum',
    companyName: 'ABC Company',
    phoneNumbers: [
      {
        type: 'Work',
        number: '555-555-6666',
        primary: true,
      },
      {
        type: 'Cell',
        number: '555-555-5555',
        primary: false,
      },
    ]
  },
  {
    photo: '/images/profile.jpg',
    salutation: 'Mr.',
    firstName: 'Jake',
    lastName: 'Moody',
    companyName: 'ABC Company',
    phoneNumbers: [
      {
        type: 'Work',
        number: '555-555-6666',
        primary: false,
      },
      {
        type: 'Cell',
        number: '555-555-7777',
        primary: true,
      },
    ]
  },
  {
    photo: '/images/profile.jpg',
    salutation: 'Mr.',
    firstName: 'Billy',
    lastName: 'Jackson',
    companyName: 'ABC Company',
    phoneNumbers: [
      {
        type: 'Work',
        number: '555-555-6666',
        primary: false,
      },
      {
        type: 'Home',
        number: '555-555-7777',
        primary: true,
      },
    ]
  },
];

export default contacts;