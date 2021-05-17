import * as React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { GRAPH_URL } from './Constants';
import { useBoolean } from './hooks';
import { useAuth } from './contexts';

const cache = new InMemoryCache();

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const getNewToken = async (
  refreshToken: string,
): Promise<Mutation['refreshToken']> => {
  if (__DEV__) {
    console.log('Refreshing token...');
  }

  const response = await fetch(GRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation RefreshToken {
          refreshToken(refreshToken: "${refreshToken}") {
            jwt
            jwtExpiresAt
            refreshToken
            refreshTokenExpiresAt
          }
        }
      `,
    }),
  });

  const { data } = (await response.json()) as {
    data: {
      refreshToken: Mutation['refreshToken'];
    };
  };

  return data.refreshToken;
};

const ClientProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useBoolean(true);

  React.useEffect(() => {
    (async () => {
      await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        maxSize: 1048576 * 3, // 3MB
      });

      setLoading(false);
    })();
  }, []);

  const { jwt, jwtExpiresAt, refreshToken, logIn, logOut } = useAuth();

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (__DEV__) {
        console.log({
          graphQLErrors,
          networkError,
        });
      }

      let message = undefined;

      if (graphQLErrors) {
        if (jwtExpiresAt && jwtExpiresAt <= Date.now()) {
          let forward$;

          if (isRefreshing) {
            forward$ = fromPromise(
              new Promise((resolve) => {
                pendingRequests.push(() => resolve(undefined));
              }),
            );
          } else {
            isRefreshing = true;

            forward$ = fromPromise(
              getNewToken(refreshToken)
                .then((data) => {
                  logIn({
                    jwt: data.jwt,
                    jwtExpiresAt: data.jwtExpiresAt,
                    refreshToken: data.refreshToken,
                    refreshTokenExpiresAt: data.refreshTokenExpiresAt,
                  });

                  resolvePendingRequests();
                })
                .catch(() => {
                  Alert.alert(
                    'Uh-oh! It looks like you’ve been logged out.',
                    undefined,
                    [
                      {
                        text: 'OK',
                        onPress: () => logOut(true),
                      },
                    ],
                  );
                }),
            ).filter((value) => Boolean(value));
          }

          return forward$.flatMap(() => forward(operation));
        }

        message = graphQLErrors[0].message;
      }

      if (networkError?.message) {
        message = networkError.message;
      }

      const forbiddenAlerts = [
        'Internal server error',
        'Network request failed',
      ];

      if (message && !forbiddenAlerts.includes(message)) {
        Alert.alert(message);
      }
    },
  );

  const authLink = setContext(() => ({
    headers: {
      authorization: jwt ? `JWT ${jwt}` : null,
    },
  }));

  const httpLink = new HttpLink({
    uri: GRAPH_URL,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network',
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  React.useEffect(() => {
    if (jwt) {
      return;
    }

    (async () => {
      try {
        client.clearStore();
      } catch {}
    })();
  }, [jwt]);

  if (loading) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider;
