const dataEnum = {
  status: {
    0: 'active',
    1: 'archived',
  },
  taskStatus: {
    0: 'wait',
    1: 'done',
    2: 'skipped',
  },
};

const schemaVersion = 1;

const Treatment = {
  name: 'Treatment',
  properties: {
    name: 'string',
    medication: 'bool',
    dose: 'int?',
    doseUnit: 'string?',
    tags: 'string?[]', // QUESTION: Is this still the way we want to do this? It feels weird to have a full list of Objects for every other property, plus linking directly gives an advantage: https://realm.io/docs/javascript/4.0.0-beta/api/Realm.html#~PropertyType (sb)
    start: 'date?',
    end: 'date?',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Symptom = {
  name: 'Symptom',
  properties: {
    name: 'string',
    tags: 'string?[]',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Incident = {
  name: 'Incident',
  properties: {
    symptoms: 'Symptom[]', /* NOTE: Arrays of custom type cannot be nullable on realmjs (https://stackoverflow.com/questions/54447498/realm-property-dummy-of-type-array-cannot-be-nullable) (sb)
                                     They can be assigned the empty array, however, which allows for very similar functionality.
                             */
    providers: 'Provider[]',
    treatments: 'Treatment[]',
    notes: 'Note[]',
    severity: 'int',
    tags: 'string?[]',
    logDate: 'date',
  },
};

const Reflection = {
  name: 'Reflection',
  properties: {
    sleepDuration: 'float',
    sleepQuality: 'int',
    diet: 'int',
    activities: 'Activity[]',
    notes: 'Note[]',
    logDate: 'date',
  },
};

const Activity = {
  name: 'Activity',
  properties: {
    name: 'string',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Reminder = {
  name: 'Reminder',
  properties: {
    tasks: 'Task[]',
    text: {type: 'string', default: ''},
    schedule: 'string',
  },
};

const ReminderOccurrence = {
  name: 'ReminderOccurrence',
  properties: {
    taskStatus: {type: 'int', default: 0}, // dataEnum.taskStatus
    parent: 'Reminder',
  },
};

const Task = {
  name: 'Task',
  properties: {
    todo: 'string',
    treatment: 'Treatment',
  },
};

const Tag = {
  name: 'Tag',
  properties: {
    name: 'string',
    associates: 'string[]',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Contact = {
  name: 'Contact',
  properties: {
    type: 'string',
    content: 'string',
  },
};

const Provider = {
  name: 'Provider',
  properties: {
    firstName: 'string',
    lastName: 'string',
    address: 'string?',
    contacts: 'Contact[]',
    occupation: 'string?',
    photo: 'string?',
  },
};

const Appointment = {
  name: 'Appointment',
  properties: {
    provider: 'Provider',
    time: 'date',
    notes: 'Note[]',
  },
};

const Note = {
  name: 'Note',
  properties: {
    text: 'string',
    logDate: 'date',
  },
};

export {
  schemaVersion,
  dataEnum,
  Treatment,
  Symptom,
  Incident,
  Reflection,
  Activity,
  Reminder,
  ReminderOccurrence,
  Tag,
  Appointment,
  Contact,
  Note,
  Provider,
  Task,
};
