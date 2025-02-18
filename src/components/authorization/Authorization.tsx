import { useEffect, useState } from "react";
import Day from "../day/Day";

function Authorization() {
  const [schedule, setSchedule] = useState<Array<ISchedule>>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  interface ISchedule {
    day: string;
    day_start: string;
    day_end: string;
    id: number;
  }

  useEffect(() => {
    let result = fetch("http://localhost:3000/schedule/", {
      method: "GET",
    });
    result
      .then((res) => {
        return res.json();
      })
      .then((data) => setSchedule((prev) => (prev = data)));
  }, []);
  const AuthLogin = () => {
    setEmail("");
    setPassword("");
    let respons = fetch("http://localhost:3000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    respons
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.response == "Успешно авторизован") {
          console.log("Успешно авторизован");
          setAuth(true);
        }
      });
    return "";
  };
  const GetDayAccess = () => {
    let respons = fetch("http://localhost:3000/access/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    respons
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <section className="authorization">
        <h3>Доступное время:</h3>
        {schedule?.map((el) => (
          <Day key={el.id + "day"} el={el} auth={auth} />
        ))}
        {!auth && <h2 className="form__heading">Авторизация</h2>}
        {!auth && (
          <form
            className="schedule__form form"
            onSubmit={(e) => {
              e.preventDefault();
              AuthLogin();
              GetDayAccess();
            }}
          >
            <input
              type="email"
              className="form__input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="form__input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Отправить</button>
          </form>
        )}
        {auth && (
          <button onClick={(): void => setAuth(false)}>Разлогиниться</button>
        )}
      </section>
    </>
  );
}

export default Authorization;
