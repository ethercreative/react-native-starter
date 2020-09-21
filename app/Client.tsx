import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { persistCache } from 'apollo-cache-persist';
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types';
import { GRAPH_URL } from './Constants';

const cache = new InMemoryCache();

const ClientProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      await persistCache({
        cache,
        storage: AsyncStorage as PersistentStorage<
          PersistedData<NormalizedCacheObject>
        >,
        maxSize: 10000000,
      });

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return null;
  }

  const client = new ApolloClient({
    uri: GRAPH_URL,
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

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider;
