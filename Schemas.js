const dataEnum = {
  status: {
    0: 'active',
    1: 'archived',
  },
  task: {
    0: 'wait',
    1: 'done',
    2: 'skipped',
  },
};

const dataSchemas = {
  Treatment: {
    name: 'Treatment',
    properties: {
      name: 'string',
      medication: 'bool',
      dose: 'int?',
      doseUnit: 'string?',
      tags: 'string?[]',
      start: 'date?',
      end: 'date?',
      status: {type: 'int', default: 0},
    },
  },

  Symptom: {
    name: 'Symptom',
    properties: {
      name: 'string',
      tags: 'string?[]',
      status: {type: 'int', default: 0},
    },
  },

  Incident: {
    name: 'Incident',
    properties: {
      symptoms: 'Symptom?[]',
      providers: 'Provider?[]',
      treatments: 'Treatment?[]',
      notes: 'Note?[]',
      severity: 'int',
      tags: 'string?[]',
      logDate: 'date',
    },
  },

  Reflection: {
    name: 'Reflection',
    properties: {
      sleepDuration: 'float',
      sleepQuality: 'int',
      diet: 'int',
      activities: 'Activity[]',
      notes: 'Note?[]',
      logDate: 'date',
    },
  },

  Activity: {
    name: 'Activity',
    properties: {
      name: 'string',
      status: {type: 'int', default: 0},
    },
  },

  Reminder: {
    name: 'Reminder',
    properties: {
      tasks: 'Task?[]',
      text: {type: 'string', default: ''},
      schedule: 'string',
    },
  },

  ReminderOccurrence: {
    name: 'ReminderOccurrence',
    properties: {
      status: {type: 'int', default: 0},
      parent: 'Reminder',
    },
  },

  Task: {
    name: 'Task',
    properties: {
      todo: 'string',
      treatment: 'Treatment?',
    },
  },

  Tag: {
    name: 'Tag',
    properties: {
      name: 'string',
      associates: 'string[]',
      status: {type: 'int', default: 0},
    },
  },

  Provider: {
    name: 'Provider',
    properties: {
      firstName: 'string',
      lastName: 'string',
      address: 'string?',
      contacts: 'Contact?[]',
      occupation: 'string?',
      photo: 'string?',
    },
  },

  Contact: {
    name: 'Contact',
    properties: {
      type: 'string',
      content: 'string',
    },
  },

  Appointment: {
    name: 'Appointment',
    properties: {
      provider: 'Provider',
      time: 'date',
      notes: 'Note?[]',
    },
  },

  Note: {
    name: 'Note',
    properties: {
      text: 'string',
      logDate: 'date',
    },
  },
};

export {dataEnum, dataSchemas};
