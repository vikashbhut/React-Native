@echo off
REM Set Node option for OpenSSL legacy provider
set NODE_OPTIONS=--openssl-legacy-provider

REM Start Metro bundler
echo Starting React Native Metro bundler...
npx react-native start --reset-cache
pause

@REM  $env:NODE_OPTIONS="--openssl-legacy-provider"; ./gradlew assembleRelease


