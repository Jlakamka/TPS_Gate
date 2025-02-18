import { useEffect, useState } from "react";

interface Ischedule {
  day: string;
  day_start: string;
  day_end: string;
  id: number;
}
interface IDayProps {
  el: Ischedule;
  auth: boolean;
}
function Day({ el, auth }: IDayProps) {
  const [dayStart, SetdayStart] = useState<string>(el.day_start);
  const [dayEnd, SetdayEnd] = useState<string>(el.day_end);
  const [editActive, setEditActive] = useState<boolean>(false);
  let [dayStartHours, dayStartMinutes] = dayStart.split(":");
  let [dayEndHours, dayEndMinutes] = dayEnd.split(":");

  useEffect(() => {}, [dayStart, dayEnd]);

  function EditDay() {
    fetch("http://localhost:3000/day/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: el.id,
        day_start_new: dayStart,
        day_end_new: dayEnd,
      }),
    });
  }
  function addFormEditDay() {
    setEditActive((prev) => !prev);
  }

  return (
    <div
      key={el.id + "day"}
      className={"authorization__schedule" + (auth ? "-active" : "")}
    >
      {!editActive && (
        <p key={el.id + "list"}>{`[${el.day} ${dayStart} ${dayEnd}]`}</p>
      )}
      {auth && !editActive && (
        <button key={el.id + "test"} onClick={addFormEditDay}>
          Изменить
        </button>
      )}
      {auth && editActive && (
        <form
          className="schedule__form form"
          onSubmit={(e) => {
            e.preventDefault();
            EditDay();
            addFormEditDay();
          }}
        >
          <div className="schedule__form-content">
            <label className="schedule__form-label" htmlFor="">
              с
            </label>
            <input
              type="time"
              max={`${Number(dayEndHours) - 1}:${dayEndMinutes}`}
              className="form__input"
              value={dayStart}
              onChange={(e) => SetdayStart(e.target.value)}
            />
            <label className="schedule__form-label" htmlFor="">
              до
            </label>
            <input
              type="time"
              min={`${Number(dayStartHours) + 1}:${dayStartMinutes}`}
              className="form__input"
              value={dayEnd}
              onChange={(e) => SetdayEnd(e.target.value)}
            />
          </div>

          <button className="schedule__form-button" type="submit">
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
}

export default Day;
