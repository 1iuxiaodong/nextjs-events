import css from "./styles/notification.module.css";

import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

function Notification(props) {
  const notifCtx = useContext(NotificationContext);
  const { title, message, status } = props;
  const divCss = `${css.notification} ${css[status]}`;

  return (
    <div className={divCss} onClick={() => notifCtx.toggleNotification(null)}>
      <h2>{title}</h2>

      {typeof message === "string" && <p>{message}</p>}
      {Array.isArray(message) && (
        <div>
          {message?.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
