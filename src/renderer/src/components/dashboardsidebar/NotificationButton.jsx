import React, { useState } from "react";

const NotificationButton = ({ title = "Messenger", text="tesds" }) => {
  const [notificationSet, setNotificationSet] = useState(false);

  const showNotification = () => {
    if (notificationSet) {
      console.log("Notification already shown!");
      return;
    }

    if ("Notification" in window) {
      // Request permission to show notifications
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            createNotification();
          } else {
            console.log("Permission denied for notifications.");
          }
        });
      } else if (Notification.permission === "granted") {
        createNotification();
      } else {
        console.log("Permission denied for notifications.");
      }
    } else {
      console.log("Notifications are not supported in this environment.");
    }
  };

  const createNotification = () => {
    const notification = new Notification(title, {
      body: text,
      icon: "./build/icon.ico", // Optional: Replace with your own icon path
      silent: false, // Optional: Set to true for silent notifications
    });

    // Mark notification as already shown
    setNotificationSet(true);

    // Optional: Add event listeners to the notification
    notification.onclick = () => {
      console.log("Notification clicked!");
    };
  };

  return (
    <button
      onClick={showNotification}
      style={{
        padding: "10px 20px",
        backgroundColor: notificationSet ? "gray" : "blue",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: notificationSet ? "not-allowed" : "pointer",
      }}
      disabled={notificationSet} // Disable button after notification is shown
    >
      {notificationSet ? "Notification Sent" : "Send Notification"}
    </button>
  );
};

export default NotificationButton;