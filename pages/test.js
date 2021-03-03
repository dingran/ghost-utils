import React from 'react';
import { useAuth } from '@/lib/auth';
import LoginButtons from '@/components/LoginButtons';

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <div>
        <LoginButtons></LoginButtons>
        {auth.user ? (
          <div>
            <p>Email: {auth.user.email}</p>
            <button onClick={(e) => auth.signout()}>Sign Out</button>
          </div>
        ) : (
          <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
        )}
      </div>
    </>
  );
}
