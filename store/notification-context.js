import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function ({ title, message, status }) {},
  hideNotification: function () {},
});

function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState();
  function showNotificationHandler({ title, message, status }) {
    setActiveNotification({
      title,
      message,
      status,
    });
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
