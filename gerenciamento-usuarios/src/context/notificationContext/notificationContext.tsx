import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Notification = {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
};

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Notification) => {
    setNotification(notification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  setTimeout(() =>{
    hideNotification()
  }, 4500)

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      {notification && (
        <div
        className='cursor-pointer'
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            padding: '16px 24px',
            backgroundColor: (() => {
              switch (notification.type) {
                case 'success':
                  return '#4caf50';
                case 'error':
                  return '#f44336';
                case 'warning':
                  return '#e7000b';
                case 'info':
                default:
                  return '#ffffff';
              }
            })(),
            color: (() => {
              switch (notification.type) {
                case 'success':
                  return 'white';
                case 'error':
                  return 'white';
                case 'warning':
                  return 'white';
                case 'info':
                default:
                  return 'black';
              }
            })(),
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            minWidth: 200,
            fontWeight: 'normal',
          }}
          onClick={hideNotification}
          role="alert"
          aria-live="assertive"
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('Notification error');
  }
  return context;
};

