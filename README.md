# Symply
Symply: Symptom and Treatment Tracking

Steps for launching (Ubuntu, Windows):
- Set up the environment according to the [React Native CLI guide](https://facebook.github.io/react-native/docs/getting-started.html)
- Clone the repo from GitHub
- run `npm install` in the project root directory
- Open the `android` folder as an Android Studio project. gradle should trigger automatically
- Start the Android emulator, either from the Android Studio AVD Manager or the terminal with `emulator -avd [emulator_name] -gpu host`
- Run `npm start` to launch the Metro bundler server
- Run `npx react-native run-android` to finish building the app. It should launch automatically in your device emulator.
