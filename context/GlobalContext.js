'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

// create context
const GlobalContext = createContext();

// Create provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the context
export function useGloablContext() {
  return useContext(GlobalContext);
}
