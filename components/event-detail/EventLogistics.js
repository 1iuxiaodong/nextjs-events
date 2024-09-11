import classes from "./EventLogistics.module.css";
import LogisticsItem from "./LogisticsItem";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";

function EventLogistics({ date, address, image, imageAlt }) {
  const formattedDate = new Date(date).toLocaleDateString("zh-CN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{formattedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{formattedAddress}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
