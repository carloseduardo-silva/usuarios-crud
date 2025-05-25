import { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      {notification && (
        <div
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
                  return '#ff9800';
                case 'info':
                default:
                  return '#2196f3';
              }
            })(),
            color: 'white',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            minWidth: 200,
            fontWeight: 'bold',
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
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

