# Symply
### Symply: Symptom and Treatment Tracking

### Requirements
- Node 8.3+ OR Node 10.x

#### Steps for launching (Ubuntu, Windows):
This assumes you are developing for Android. The iOS procedure will be similar but differ in building and launching the application via a device emulator.
1. Set up the environment according to the [React Native CLI guide](https://facebook.github.io/react-native/docs/getting-started.html)
2. Clone the repo from GitHub
3. Run `npm install` in the project root directory
4. Run `npx react-native link` in the project root directory. Necessary for custom asset (Roboto font) import. 
5. Open the `android` folder as an Android Studio project. gradle should trigger automatically
6. Start the Android emulator, either from the Android Studio AVD Manager or the terminal with `emulator -avd [emulator_name] -gpu host`
7. Run `npm start` to launch the Metro bundler server
8. Run `npm run android` to bundle and launch the app. It should appear automatically in your device emulator once finished.
