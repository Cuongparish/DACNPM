import { FC, useEffect } from 'react';
import { Role, useRoleContext } from './context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../pages/Spinner';
import { useAuth0 } from '@auth0/auth0-react';

export const withRoleCheck = (role: Role) => (WrappedComponent: FC) => {
  const AuthHOC: FC = (props) => {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const {role: currentRole, setRole} = useRoleContext();
    
    useEffect(() => {
      console.log('withRoleCheck: user:', user)
      if(!user){
        console.log('withRoleCheck: user is null')
        navigate(role.loginUrl);
        return;
      }
      if(currentRole !== undefined) return;
      role.check(user.sub as string) 
        .then((isAuthenticated) => {
          if(isAuthenticated) {
            setRole(role);
            return;
          }
          setRole(null);
        })
        .catch(() => {
          setRole(null);
        });
    }, [user, currentRole, setRole, role, navigate]);
    if(currentRole === undefined) {
      return <Spinner />;
    }
    if(currentRole === null || currentRole !== role) {
      const RegisterProfile = role.RegisterProfile
      return <RegisterProfile />;
    }
    
    if(currentRole === role) {
      return <WrappedComponent {...props} />;
    }
    return <Spinner />
  };

  return () => <AuthHOC/>;
}
