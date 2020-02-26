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

const schemaVersion = 2;

const Treatment = {
  name: 'Treatment',
  properties: {
    name: 'string',
    medication: 'bool',
    dose: 'int?',
    doseUnit: 'string?',
    tags: 'Tag[]',
    start: 'date?',
    end: 'date?',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Symptom = {
  name: 'Symptom',
  properties: {
    name: 'string',
    tags: 'Tag[]',
    status: {type: 'int', default: 0}, // dataEnum.status
  },
};

const Incident = {
  name: 'Incident',
  properties: {
    symptoms: 'Symptom[]',
    providers: 'Provider[]',
    treatments: 'Treatment[]',
    notes: 'Note[]',
    severity: 'int',
    tags: 'Tag[]',
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
    treatment: 'Treatment?',
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

const Contact = {
  name: 'Contact',
  properties: {
    type: 'string',
    content: 'string',
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

const allSchemas = {
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

const defaultOpenParams = {
  schema: Object.values(allSchemas),
  schemaVersion,
};

export {dataEnum, schemaVersion, allSchemas, defaultOpenParams};
