import { useRouter } from 'next/router';
import nookies from 'nookies';

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const token = nookies.get().token;
      console.log(!token);

      // If there is no access token we redirect to "/" page.
      if (!token) {
        Router.replace('/Login');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
