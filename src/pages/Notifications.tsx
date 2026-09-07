import { useEffect, useState } from "react";
import "./Notifications.css";

type Notification = {
  id: number;
  email: string;
  title: string;
  message: string;
  type: string;
  read: number;
  created_at: string;
};

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const savedUser = localStorage.getItem("campusXUser");

        if (!savedUser) {
          console.log("No student account found.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);

        const email = user.email;

        if (!email) {
          console.log("No email found in student account.");
          setLoading(false);
          return;
        }

        console.log("Loading notifications for:", email);

        const response = await fetch(
          `http://localhost:5000/api/notifications/${encodeURIComponent(
            email
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to load notifications");
        }

        const data = await response.json();

        console.log("Notifications received:", data);

        setNotifications(data);
      } catch (error) {
        console.error("Notification error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {
          method: "PATCH",
        }
      );

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: 1,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => notification.read === 0
  ).length;

  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <div>
          <h1>Notifications</h1>

          <p>
            Stay updated with your CampusX activities.
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="unread-count">
            {unreadCount} unread
          </span>
        )}

      </div>

      {loading ? (
        <div className="notifications-empty">
          <p>Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="notifications-empty">

          <div className="empty-icon">
            🔔
          </div>

          <h2>No notifications yet</h2>

          <p>
            You'll see updates here when something happens
            with your CampusX account.
          </p>

        </div>
      ) : (
        <div className="notifications-list">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className={`notification-card ${
                notification.read === 0
                  ? "unread"
                  : ""
              }`}
              onClick={() => {
                if (notification.read === 0) {
                  markAsRead(notification.id);
                }
              }}
            >

              <div className="notification-icon">
                {notification.type === "Approved"
                  ? "🎉"
                  : notification.type === "Rejected"
                  ? "⚠️"
                  : "🔔"}
              </div>

              <div className="notification-content">

                <div className="notification-title-row">

                  <h2>
                    {notification.title}
                  </h2>

                  {notification.read === 0 && (
                    <span className="new-badge">
                      NEW
                    </span>
                  )}

                </div>

                <p>
                  {notification.message}
                </p>

                <span className="notification-date">
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Notifications;