import React from 'react';
import { UserProvider } from './context/UserContext';
import PortalContent from './PortalContent';

export default function App() {
  return (
    <UserProvider>
      <PortalContent />
    </UserProvider>
  );
}
