import React from "react";

const useNotification = () => {
  const [notifications, setNotifications] = React.useState([]);

  const showNotification = (message, type = "info", duration) => {
    const newNotification = { id: Date.now(), message, type, duration };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  return { notifications, showNotification, removeNotification };
};

export { useNotification };
