import * as React from 'react';
import { useBoolean, useConfirmation } from '../hooks';
import { SecureStorage, Storage } from '../helpers';

interface Jwt {
  jwt: string;
  jwtExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

interface AuthContextProps {
  jwt: string;
  jwtExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  logIn: ({
    jwt,
    jwtExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
  }: Jwt) => void;
  logOut: (force?: boolean) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  jwt: '',
  jwtExpiresAt: 0,
  refreshToken: '',
  refreshTokenExpiresAt: 0,
  logIn: () => {},
  logOut: () => {},
});

const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [jwt, setJwt] = React.useState<string>('');
  const [jwtExpiresAt, setJwtExpiresAt] = React.useState<number>(0);
  const [refreshToken, setRefreshToken] = React.useState<string>('');

  const [
    refreshTokenExpiresAt,
    setRefreshTokenExpiresAt,
  ] = React.useState<number>(0);

  const logIn = ({
    jwt,
    jwtExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
  }: Jwt) => {
    setJwt(jwt);
    setJwtExpiresAt(jwtExpiresAt);
    setRefreshToken(refreshToken);
    setRefreshTokenExpiresAt(refreshTokenExpiresAt);

    SecureStorage.set('jwt', jwt);
    SecureStorage.set('jwtExpiresAt', String(jwtExpiresAt));
    SecureStorage.set('refreshToken', refreshToken);
    SecureStorage.set('refreshTokenExpiresAt', String(refreshTokenExpiresAt));
  };

  const doLogOut = () => {
    setJwt('');
    setJwtExpiresAt(0);
    setRefreshToken('');
    setRefreshTokenExpiresAt(0);

    Storage.clear();
    SecureStorage.clear();
  };

  const showConfirmation = useConfirmation();

  const logOut = async (force?: boolean) => {
    if (force) {
      doLogOut();
      return;
    }

    const confirmed = await showConfirmation({
      title: 'Are you sure you want to log out?',
    });

    if (!confirmed) {
      return;
    }

    doLogOut();
  };

  const [loading, setLoading] = useBoolean(true);

  React.useEffect(() => {
    (async () => {
      const jwt = await SecureStorage.get('jwt');
      const jwtExpiresAt = await SecureStorage.get('jwtExpiresAt');
      const refreshToken = await SecureStorage.get('refreshToken');
      const refreshTokenExpiresAt = await SecureStorage.get(
        'refreshTokenExpiresAt',
      );

      setJwt(jwt);
      setJwtExpiresAt(Number(jwtExpiresAt));
      setRefreshToken(refreshToken);
      setRefreshTokenExpiresAt(Number(refreshTokenExpiresAt));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        jwt,
        jwtExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };