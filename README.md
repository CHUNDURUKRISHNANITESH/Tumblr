# Project Setup and Run Instructions

## Prerequisites

Before running the project, ensure the following are installed:

- Node.js (v18 or later recommended)
- npm
- React Native CLI
- Android Studio
- Android SDK
- Java Development Kit (JDK 17 recommended)
- A physical Android device or Android emulator

---

## Clone the Repository

```bash
git clone https://github.com/CHUNDURUKRISHNANITESH/Tumblr.git
```

Navigate to the project directory:

```bash
cd Tumblr
```

---

## Install Dependencies

Install all required packages:

```bash
npm install
```

---

## Start Metro Bundler

Start the Metro bundler by running:

```bash
npx react-native start
```

Keep this terminal running while testing the debug version of the app.

---

## Run the Application (Android)

Open another terminal and execute:

```bash
npx react-native run-android
```

---

# Generate Debug APK

To generate a debug APK:

```bash
cd android
gradlew assembleDebug
```

The generated APK will be available at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Install it on a connected Android device:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

> **Note:** The debug APK requires the Metro Bundler to be running during development.

---

# Generate Release APK

To generate a release APK:

```bash
cd android
gradlew assembleRelease
```

The generated release APK will be available at:

```text
android/app/build/outputs/apk/release/app-release.apk
```

The release APK can be installed on any compatible Android device and **does not require the Metro Bundler**.

---

## Notes

- Enable **USB Debugging** when testing on a physical Android device.
- For debugging on a physical device, run:

```bash
adb reverse tcp:8081 tcp:8081
```

- If native Android files (such as app icons or Gradle configuration) are modified, rebuild the application before testing.
- The **release APK** is intended for sharing and production testing, while the **debug APK** is intended for development and debugging.


## Assumptions Made During Development

* The application is developed and tested primarily for Android devices, as required by the project specification.
* User account information and profile descriptions are stored using **AsyncStorage** to support multiple users without requiring a backend service.
* **Cloudinary-hosted images**, posts, stories, and profile data are used throughout the application in accordance with the project requirements.
* The static OTP (`1234`) is used only for demonstration purposes and does not represent a real authentication system.
* Cloudinary-hosted video URLs are used only for the Reels feature, along with other media assets used in the application.
* Like/Unlike interactions for posts and reels are maintained only during the current application session and are not persisted after the application is closed, as specified in the requirements.
* The application is optimized for portrait orientation to provide a consistent social media user experience.
* A stable internet connection is assumed for loading Cloudinary-hosted reel videos.


## Third-Party Packages Used with a brief reason for each

| Package                                   | Purpose                                                                                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| @react-navigation/native                  | Core navigation library used for handling screen navigation in the app.                         |
| @react-navigation/native-stack            | Provides stack navigation for authentication flow (Splash, Login, Signup, OTP).                 |
| @react-navigation/bottom-tabs             | Implements bottom tab navigation (Home, Feed, Profile screens).                                 |
| @react-navigation/stack                   | Additional stack navigation support for complex screen transitions.                             |
| @react-native-async-storage/async-storage | Used for local data persistence such as user accounts, login session, and profile descriptions. |
| react-native-gesture-handler              | Enables gesture-based interactions and smooth navigation handling.                              |
| react-native-safe-area-context            | Ensures UI elements are properly rendered within device safe areas (notches, status bar, etc.). |
| react-native-screens                      | Optimizes navigation performance by managing native screen components.                          |
| react-native-video                        | Used for implementing autoplay video playback in the Feed (Reels) screen.                       |
| react-native-svg                          | Used for rendering vector graphics such as story rings and UI icons.                            |
| react-native-toast-message                | Displays toast notifications for errors, validations, and user feedback.                        |
| react-native-vector-icons                 | Provides scalable icons used across the application (heart, comment, share, etc.).              |

