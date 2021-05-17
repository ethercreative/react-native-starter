import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

interface UserContextProps {
  user?: User;
  refetch: () => void;
}

const UserContext = React.createContext<UserContextProps>({
  user: undefined,
  refetch: () => {},
});

const useUser = () => React.useContext(UserContext);

const UserProvider: React.FC = ({ children }) => {
  const { data, refetch } = useQuery<{ viewer: User }>(GET_VIEWER);

  return (
    <UserContext.Provider
      value={{
        user: data?.viewer,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      id
      firstName
      lastName
      fullName
      email
    }
  }
`;

export { UserProvider, useUser };
