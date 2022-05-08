import { useState, useEffect ,useRef} from "react";
import "./App.css";
function App() {
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const focusInput=useRef()
  useEffect(() => {
    const itemLocal = localStorage.getItem("items");
    const localString = JSON.parse(itemLocal);
    if (localString) setItem(localString);
  }, []);
  const handelAdd = () => {
    const newItem = { id: new Date().getTime().toString(), title: value };
    setItem([...item, newItem]);
    localStorage.setItem("items", JSON.stringify([...item, newItem]));
    setValue("");
  };
  const handelDelete = (task) => {
    const del = item.filter((obj) => {
      return task.id !== obj.id;
    });
    setItem(del);
    localStorage.setItem("items", JSON.stringify(del));
  };
  const handelEdit = (ele) => {
    let couranteVal = item.find((item) => {
      return item.id === ele.id;
    });
    setValue(couranteVal.title);
    handelDelete(ele);
    focusInput.current.focus()
  };
  return (
    <div className="App flex">
      <h1>ToDO List </h1>
      <div className="flex inputHeader">
        <input
        ref={focusInput}
          type="text"
          placeholder="write the task"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button className="button" onClick={handelAdd}>
          Add
        </button>
      </div>
      <ul className="list flex">
        {item?.map((item) => {
          return (
            <li key={item.id} className="listItem flex">
              <span>{item.title}♪</span>
              <div>
                <button
                  className="button flex"
                  onClick={() => handelDelete(item)}
                >
                  Delete
                </button>
                <button
                  className="button flex"
                  onClick={() => handelEdit(item)}
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
