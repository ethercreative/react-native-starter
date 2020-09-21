brew install\
  jpegoptim\
  optipng\
  svgo;

yarn global add expo;

expo init --name Starter --template bare-typescript;

mv Starter/* .;

expo install @apollo/client\
             @expo/react-native-action-sheet\
             @react-native-community/async-storage\
             @react-native-community/datetimepicker\
             @react-native-community/masked-view\
             @react-navigation/bottoms-tabs\
             @react-navigation/core\
             @react-navigation/native\
             @react-navigation/native-stack\
             @react-navication/stack\
             apollo-cache-persist\
             dayjs\
             expo\
             expo-constants\
             expo-linear-gradient\
             expo-linking\
             expo-splash-screen\
             graphql\
             graphql-tag\
             react-native-gesture-handler\
             react-native-global-props\
             react-native-iphone-x-helper\
             react-native-reanimated\
             react-native-render-html\
             react-native-safe-area-context\
             react-native-screens\
             react-native-tailwindcss\
             react-native-webview\
             react-navigation\
             react-navigation-stack\
             sentry-expo;

yarn add --dev @graphql-codegen/cli\
               @graphql-codegen/typescript\
               @graphql-codegen/typescript-operations\
               @types/react\
               @types/react-native\
               @typescript-eslint/eslint-plugin\
               @typescript-eslint/parser\
               babel-preset-expo\
               eslint\
               eslint-config-universe\
               husky\
               imagemin\
               imagemin-jpegoptim\
               imagemin-optipng\
               imagemin-svgo\
               lint-staged\
               prettier\
               typescript;

rm install.sh;
