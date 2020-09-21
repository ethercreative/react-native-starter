import { GraphQLClient } from 'graphql-request';

declare var process: {
  env: {
    GRAPH_URL: string;
    GRAPH_TOKEN: string;
  };
};

export const client = (token?: string): GraphQLClient => {
  let endpoint = process.env.GRAPH_URL;

  if (token) {
    endpoint += `?token=${token}`;
  }

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_TOKEN}`,
    },
  });
};
