import Button from "../ui/button";
import classes from "./EventSearch.module.css";
import { useRef } from "react";

function EventSearch({ onSearch }) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function searchHandler(event) {
    event.preventDefault();
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;
    onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={classes.form} onSubmit={searchHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <Button>Find Event</Button>
    </form>
  );
}

export default EventSearch;
