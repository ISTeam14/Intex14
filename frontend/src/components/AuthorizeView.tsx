import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import { pingAuth } from '../api/MovieAPI'; // Adjust the import path as necessary
interface User {
  email: string;
  roles: string[];
}
export const UserContext = createContext<User | null>(null);
function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  const [user, setUser] = useState<User>({ email: '', roles: [] });
  useEffect(() => {
    async function authorizeUser() {
      const result = await pingAuth();
      if (result.ok) {
        setUser({ email: result.email, roles: result.roles });
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    }

    authorizeUser();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }
  return <Navigate to="/" />;
}
// Still works for any use of <AuthorizedUser value="email" />
export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);
  if (!user) return null;
  return props.value === 'email' ? <>{user.email}</> : null;
}
export default AuthorizeView;
// function fetchWithRetry(
//   arg0: string,
//   arg1: { method: string; credentials: string },
//   arg2: Promise<void>
// ) {
//   throw new Error('Function not implemented.');
// }
