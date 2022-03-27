import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../_state';
export {Home};

function Home()
{
  const auth = useRecoilValue(authAtom);
  // static displayName = Home.name;
  return (
    <div>
      <h1>Hello, {auth?.login}. Welcome to employee App!</h1>
      <p>Welcome to Employee single-page application, built with React and C#</p>
      <p><Link to="/employee">Manage Employees</Link></p>
      <p><Link to="/details">View My Profile</Link></p>
    </div>
  );
}
