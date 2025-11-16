/**
 * Notification Toast Component
 * 
 * Displays critical log alerts as toast notifications.
 * Appears when a critical log is received via Socket.io.
 */

const NotificationToast = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-red-600 text-white rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold">Critical Alert</h3>
              <p className="mt-1 text-sm">{notification.message}</p>
              {notification.log && (
                <p className="mt-1 text-xs opacity-90">
                  Source: {notification.log.source}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-white hover:text-gray-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;

