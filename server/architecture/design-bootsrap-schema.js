// used for bootstrapping api docs

export default [
  // User Signup Action
  {
    name: 'user-signup-action',
    properties: [
      {
        email: 'email',
        type: 'STRING',
      },
      {
        password: 'password',
        type: 'STRING',
      },
    ],
  },
  // User
  {
    name: 'user',
    properties: [
      {
        email: 'email',
        type: 'STRING',
      },
    ],
    associations: [
      {
        name: 'profiles',
        swaggerTypeRelationship: 'ProfileSingleRelationship',
      },
    ],
  },
  // Profile
  {
    name: 'profile',
    properties: [
      {
        firstName: 'firstName',
        type: 'STRING',
      },
      {
        lastName: 'lastName',
        type: 'STRING',
      },
    ],
    associations: [
      {
        name: 'user',
        swaggerTypeRelationship: 'UserSingleRelationship',
      },
    ],
  },
];
