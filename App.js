import React, {Component} from 'react';
import {Text, View, Button, TextInput, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
const Realm = require('realm');

// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <View>
//           <Text>Hello, world!</Text>
//         </View>
//       </NavigationContainer>
//     );
//   }
// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {realm: null, count: 0};
  }

  componentDidMount() {
    Realm.open({
      schema: [
        {
          name: 'Dog',
          properties: {name: 'string', age: {type: 'int', default: 0}},
        },
      ],
      schemaVersion: 1,
    }).then(realm => {
      this.setState({realm});
    });
  }

  componentWillUnmount() {
    // Close the realm if there is one open.
    const {realm} = this.state;
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  render() {
    let info = this.state.realm
      ? 'Number of dogs in this Realm: ' +
        this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <View>
        <Text>{info}</Text>
        <DatabaseInput
          realm={this.state.realm}
          onSubmit={() => {
            this.setState({count: this.state.count + 1});
            console.log('submitted record');
          }}
          onDelete={() => {
            this.setState({count: 0});
            console.log('deleted records');
          }}
        />
        <List realm={this.state.realm} />
      </View>
    );
  }
}

function Item({name, age}) {
  console.log(`${name}, ${age}`);
  return (
    <View>
      <Text>
        Name: {name} Age: {age}
      </Text>
    </View>
  );
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  render() {
    let realm = this.props.realm;
    if (realm) {
      const dogs = realm.objects('Dog');
      if (dogs) {
        return (
          <View>
            <FlatList
              data={dogs}
              renderItem={({item}) => <Item name={item.name} age={item.age} />}
              keyExtractor={d => d.name}
            />
          </View>
        );
      }
    }
    return null;
  }
}

class DatabaseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', age: ''};
  }
  render() {
    return (
      <View>
        <Text>Enter input to add to the database:</Text>
        <TextInput
          placeholder="Enter a dog name"
          onChangeText={name => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          placeholder="Enter a dog age"
          onChangeText={age => this.setState({age})}
          value={this.state.age}
        />
        <Button
          onPress={() => {
            this.submit();
            this.setState({name: ''});
            this.setState({age: ''});
          }}
          title="Submit Record"
        />
        <Button
          onPress={() => {
            this.delete();
          }}
          title="Delete all"
        />
      </View>
    );
  }

  submit() {
    let realm = this.props.realm;
    if (
      realm &&
      !realm.isClosed &&
      this.state.name !== '' &&
      this.state.age !== ''
    ) {
      realm.write(() => {
        realm.create('Dog', {
          name: this.state.name,
          age: parseInt(this.state.age, 10),
        });
        this.props.onSubmit();
      });
    } else {
      console.log('db closed!!!!!!!!!!!!!!!');
    }
  }

  delete() {
    const realm = this.props.realm;
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
        this.props.onDelete();
      });
    }
  }
}
