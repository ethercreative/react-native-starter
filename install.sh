yarn global add expo-cli;

expo init --name Starter --template expo-template-blank-typescript;

mv Starter/* Starter/.* .;
rm -rf Starter;

mv _App.tsx App.tsx;
mv assets/* app/assets;
rm -rf assets;

expo install\
  @apollo/client\
  @expo/react-native-action-sheet\
  @react-native-community/datetimepicker\
  @react-native-community/masked-view\
  @react-native-async-storage/async-storage\
  @react-navigation/bottom-tabs\
  @react-navigation/core\
  @react-navigation/native\
  @react-navigation/stack\
  apollo3-cache-persist\
  dayjs\
  expo\
  expo-constants\
  expo-linear-gradient\
  expo-linking\
  expo-secure-storage\
  expo-splash-screen\
  expo-updates\
  graphql\
  graphql-tag\
  react-native-gesture-handler\
  react-native-global-props\
  react-native-reanimated\
  react-native-render-html\
  react-native-safe-area-context\
  react-native-screens\
  react-native-tailwindcss\
  react-native-webview\
  sentry-expo;

yarn add --dev\
  @graphql-codegen/cli\
  @graphql-codegen/typescript\
  @graphql-codegen/typescript-operations\
  @types/react\
  @types/react-native\
  @typescript-eslint/eslint-plugin\
  @typescript-eslint/parser\
  babel-preset-expo\
  eslint\
  eslint-config-universe\
  prettier;

yarn remove\
  react-dom\
  react-native-web;

rm install.sh;

expo start;
