// used for bootstrapping api docs

export default [
  // Zoo
  {
    name: 'zoo',
    properties: [
      {
        name: 'name',
        type: 'STRING',
      },
    ],
    associations: [
      {
        name: 'employees',
        swaggerTypeRelationship: 'HumanCollectionRelationship',

        // not needed if generating only docs
        associationType: 'HasMany',
        relatedModelGetter: 'Human',
        relatedModuleName: 'human',
        jsType: 'Human[]',
        ioType: 'HUMAN_TYPE',
      },
    ],
  },
  // Human
  {
    name: 'human',
    properties: [
      {
        name: 'name',
        type: 'STRING',
      },
    ],
    associations: [
      {
        name: 'zoo',
        swaggerTypeRelationship: 'ZooSingleRelationship',

        // not needed if generating only docs
        associationType: 'BelongsTo',
        relatedModelGetter: 'Zoo',
        relatedModuleName: 'zoo',
        jsType: 'Zoo[]',
        ioType: 'ZOO_TYPE',
        alternativeKeyExpression: `alternativeKey: 'zooId',`,
      },
    ],
    // not needed if generating only docs
    foreignKeys: [
      {
        name: 'myZooId',
        model: 'Zoo',
        typeModuleName: 'zoo',
        ioType: 'ZOO_TYPE',
      },
    ],
  },
];
