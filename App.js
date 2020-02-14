import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
    this.state = {realm: null};
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
    const info = this.state.realm
      ? 'Number of dogs in this Realm that are young adults: ' +
        this.state.realm.objects('Dog').filtered('age > 2').length
      : 'Loading...';

    return (
      <View>
        <Text>{info}</Text>
      </View>
    );
  }
}
