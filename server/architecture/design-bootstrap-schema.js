// used for bootstrapping api docs

export default [
  // User Signup Action
  {
    name: 'UserSignupAction',
    properties: [
      {
        name: 'email',
        type: 'STRING',
      },
      {
        name: 'password',
        type: 'STRING',
      },
    ],
  },
  // User
  {
    name: 'User',
    properties: [
      {
        name: 'email',
        type: 'STRING',
      },
    ],
    associations: [
      {
        name: 'profiles',
        swaggerTypeRelationship: 'UserProfileSingleRelationship',
      },
    ],
  },
  // Token create
  {
    name: 'AuthToken',
    properties: [
      {
        name: 'tokenType',
        type: 'STRING',
      },
      {
        name: 'subjectId',
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
  // Profile
  {
    name: 'UserProfile',
    properties: [
      {
        name: 'firstName',
        type: 'STRING',
      },
      {
        name: 'lastName',
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
