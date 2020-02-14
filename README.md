# Symply
### Symply: Symptom and Treatment Tracking

#### Steps for launching (Ubuntu, Windows):
This assumes you are developing for Android.
1. Set up the environment according to the [React Native CLI guide](https://facebook.github.io/react-native/docs/getting-started.html)
2. Clone the repo from GitHub
3. run `npm install` in the project root directory
4. Open the `android` folder as an Android Studio project. gradle should trigger automatically
5. Start the Android emulator, either from the Android Studio AVD Manager or the terminal with `emulator -avd [emulator_name] -gpu host`
6. Run `npm start` to launch the Metro bundler server
7. Run `npm android` to bundle and launch the app. It should appear automatically in your device emulator once finished.
