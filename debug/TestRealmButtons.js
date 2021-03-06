import React from 'react';
import {defaultOpenParams, allSchemas} from '../realm/DatabaseConfig';

import {View, Button} from 'react-native';

const Realm = require('realm');

export default function TestRealmButtons({setVisible}) {
  return (
    <View>
      <Button title="populate Realm" onPress={() => populateRealm()} />
      <Button title="depopulate Realm" onPress={() => depopulateRealm()} />
      <Button title="show Realm contents" onPress={() => showRealm()} />
      <Button title="Close debug" onPress={() => setVisible(false)} />
    </View>
  );
}

// add in mock data for development purposes
function populateRealm() {
  Realm.open(defaultOpenParams)
    .then(realm => {
      realm.write(() => {
        // create mock Note objects
        const note1 = realm.create(allSchemas.Note.name, {
          text: 'First visit',
          logDate: new Date(2020, 2, 20),
        });
        // TESTING
        console.debug('note1');

        const note2 = realm.create(allSchemas.Note.name, {
          text: "I'm really proud of what I was able to accomplish today.",
          logDate: new Date(2020, 2, 15),
        });
        // TESTING
        console.debug('note2');

        const note3 = realm.create(allSchemas.Note.name, {
          text: 'Been having trouble doing the breathing exercises today.',
          logDate: new Date(2020, 2, 10),
        });
        // TESTING
        console.debug('note3');

        // create mock Contact objects
        const contact1 = realm.create(allSchemas.Contact.name, {
          type: 'Phone Number',
          content: '(555) 555-5555',
        });
        // TESTING
        console.debug('contact1');

        // create mock Tag objects
        const tag1 = realm.create(allSchemas.Tag.name, {
          name: 'physical',
          associates: [allSchemas.Symptom.name],
        });
        // TESTING
        console.debug('tag1');

        const tag2 = realm.create(allSchemas.Tag.name, {
          name: 'side effect',
          associates: [allSchemas.Symptom.name],
        });
        // TESTING
        console.debug('tag2');

        const tag3 = realm.create(allSchemas.Tag.name, {
          name: 'good day',
          associates: [allSchemas.Reflection.name],
        });
        // TESTING
        console.debug('tag3');

        const tag4 = realm.create(allSchemas.Tag.name, {
          name: 'acute',
          associates: [allSchemas.Incident.name],
        });
        // TESTING
        console.debug('tag4');

        const tag5 = realm.create(allSchemas.Tag.name, {
          name: 'as needed',
          associates: [allSchemas.Treatment.name],
        });
        // TESTING
        console.debug('tag5');

        // create mock Symptom objects
        const sympt1 = realm.create(allSchemas.Symptom.name, {
          name: 'Anxiety',
        });
        // TESTING
        console.debug('sympt1');

        const sympt2 = realm.create(allSchemas.Symptom.name, {
          name: 'Stomach Ache',
          tags: [tag1, tag2],
        });
        // TESTING
        console.debug('sympt2');

        const sympt3 = realm.create(allSchemas.Symptom.name, {
          name: 'Ankle Pain',
        });
        // TESTING
        console.debug('sympt3');

        const sympt4 = realm.create(allSchemas.Symptom.name, {
          name: 'Not Ankle Pain',
          status: 1,
        });
        // TESTING
        console.debug('sympt4');

        // create mock Activity objects
        const activity1 = realm.create(allSchemas.Activity.name, {
          name: 'Jogging',
        });
        // TESTING
        console.debug('activity1');

        const activity2 = realm.create(allSchemas.Activity.name, {
          name: 'Painting',
        });
        // TESTING
        console.debug('activity2');

        const activity3 = realm.create(allSchemas.Activity.name, {
          name: 'Working',
        });
        // TESTING
        console.debug('activity3');

        const activity4 = realm.create(allSchemas.Activity.name, {
          name: 'Not Jogging',
        });
        // TESTING
        console.debug('activity4');

        // create mock Treatment objects
        const treat1 = realm.create(allSchemas.Treatment.name, {
          name: 'Abilify Oral',
          medication: true,
          dose: 15,
          doseUnit: 'mg',
        });
        // TESTING
        console.debug('treat1');

        const treat2 = realm.create(allSchemas.Treatment.name, {
          name: 'Erythromycin Ethlysuccinate',
          medication: true,
          dose: 400,
          doseUnit: 'mg',
          start: new Date(2020, 3, 10),
          end: new Date(2020, 3, 31),
        });
        // TESTING
        console.debug('treat2');

        const treat3 = realm.create(allSchemas.Treatment.name, {
          name: 'Breathing Exercises',
          medication: false,
        });
        // TESTING
        console.debug('treat3');

        const treat4 = realm.create(allSchemas.Treatment.name, {
          name: 'Acetaminophen',
          medication: true,
          dose: 500,
          doseUnit: 'mg',
          tags: [tag5],
        });
        // TESTING
        console.debug('treat4');

        const treat5 = realm.create(allSchemas.Treatment.name, {
          name: 'Not Breathing Exercises',
          medication: false,
          status: 1,
        });
        // TESTING
        console.debug('treat5');

        // create mock Incident objects
        const incident1 = realm.create(allSchemas.Incident.name, {
          symptoms: [sympt1, sympt2],
          treatments: [treat3],
          notes: [note3],
          severity: 4,
          tags: [tag4],
          logDate: new Date(2020, 2, 10),
        });
        // TESTING
        console.debug('incident1');

        const incident2 = realm.create(allSchemas.Incident.name, {
          symptoms: [sympt3],
          severity: 7,
          logDate: new Date(2020, 2, 20),
        });
        // TESTING
        console.debug('incident2');

        // create mock Reflection objects
        const reflect1 = realm.create(allSchemas.Reflection.name, {
          sleepDuration: 6.5,
          sleepQuality: 4,
          diet: 2,
          logDate: new Date(2020, 2, 12),
        });
        // TESTING
        console.debug('reflect1');

        const reflect2 = realm.create(allSchemas.Reflection.name, {
          sleepDuration: 8.2,
          sleepQuality: 7,
          diet: 7,
          notes: [note2],
          logDate: new Date(2020, 2, 15),
        });
        // TESTING
        console.debug('reflect2');

        // create mock Task objects
        const task1 = realm.create(allSchemas.Task.name, {
          todo: 'Call your parents',
        });
        // TESTING
        console.debug('task1');

        const task2 = realm.create(allSchemas.Task.name, {
          todo: "Check your ankle's range of motion",
          treatment: treat4,
        });
        // TESTING
        console.debug('task2');

        // create mock Reminder objects
        const reminder1 = realm.create(allSchemas.Reminder.name, {
          text: 'Sunday Morning',
          schedule: '5 8 * * 0', // every Sunday at 8:05am
          tasks: [task1],
        });
        // TESTING
        console.debug('reminder1');

        const reminder2 = realm.create(allSchemas.Reminder.name, {
          text: 'Body Checkup',
          schedule: '5 20 * * *', // every day at 8:05pm
          tasks: [task2],
        });
        // TESTING
        console.debug('reminder2');

        // create mock Provider objects
        const provider1 = realm.create(allSchemas.Provider.name, {
          firstName: 'John',
          lastName: 'Smith',
          address: '1234 Office Pkwy, Bellingham, WA 98229',
          contacts: [contact1],
          occupation: 'LMHC',
        });
        // TESTING
        console.debug('provider1');

        // create mock Appointment objects
        const appoint1 = realm.create(allSchemas.Appointment.name, {
          provider: provider1,
          time: new Date(2020, 3, 1),
          notes: [note1],
        });
        // TESTING
        console.debug('appoint1');

        const appoint2 = realm.create(allSchemas.Appointment.name, {
          provider: provider1,
          time: new Date(2020, 3, 8),
          notes: [],
        });
        // TESTING
        console.debug('appoint2');
      });
      realm.close();
    })
    .catch(error => {
      console.debug(error);
    });
}

// remove all data for development purposes
function depopulateRealm() {
  Realm.open(defaultOpenParams)
    .then(realm => {
      realm.write(() => {
        realm.deleteAll();
        // TESTING
        console.debug('deleteall');
      });
      realm.close();
    })
    .catch(error => {
      console.debug(error);
    });
}

// "console log"s contents of realm
function showRealm() {
  console.log('Show Realm: ');
  Realm.open(defaultOpenParams).then(realm => {
    console.log('realm open');
    const schemaArr = Object.values(allSchemas);
    for (const schema of schemaArr) {
      console.log(`#######${schema.name}########`);
      let iter = realm.objects(schema.name);
      console.log(iter);
      for (const val of iter) {
        console.log('Schema: ' + schema.name);
        console.log(val);
      }
    }
    realm.close();
  });
}
