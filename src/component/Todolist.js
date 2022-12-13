import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../component/styles/App.css";
export default function Todolist() {
  const ls = localStorage;
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosStored, settodosStored] = useState(ls.getItem("todos") || "0");
  const [printTodostest, setPrintTodostest] = useState([]);
  //const items = JSON.parse(localStorage.getItem("myItems"));

  function Ajouter() {
    if (inputTodo.trim().length == 0) {
      return null;
    }
    let tableauAdded = [...todos];
    tableauAdded.push(inputTodo.trim());
    setTodos(tableauAdded);
    setInputTodo("");
    console.log("tableau todos: ", tableauAdded);
    const newItems = JSON.stringify([...tableauAdded]);
    localStorage.setItem("myItems", newItems);
    //console.log("set todos:", setTodos);

    //return tableautest;
  }
  function deleteTodo(todo) {
    let tmp = [...todos];
    let i = todos.indexOf(todo);
    if (i > -1) {
      let key2 = localStorage.getItem("myItems"[i]);
      ls.removeItem(i);
      tmp.splice(i, 1);
      setTodos(tmp);
      console.log("trouve ", key2, i);
      //ls.removeItem(i);
      /*let x = localStorage.length;
      while (x-- > 0) {
        let key = localStorage.key(i);
        if (localStorage.getItem(key) === i) {
          localStorage.removeItem(key);
        }
      }*/
    }
  }
  function removeLocalStorageValues(target) {
    let i = localStorage.getItem("myItems").length;
    while (i-- > 0) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key) === target) {
        localStorage.removeItem(key);
      }
    }
  }

  useEffect(() => {
    setPrintTodostest(todos);
  }, [todos]);
  let PrintTodos = printTodostest.map((item, indice) => {
    return (
      <ListGroup.Item action variant="info" key={indice}>
        {item}
        <Button
          className="btn btn-sm float-end"
          variant="outline-danger"
          onClick={() => deleteTodo(item)}
        >
          Supprimer
        </Button>
      </ListGroup.Item>
    );
  });
  return (
    <div className="todo">
      <h2>Provide a todolist</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Ajouter();
        }}
      >
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Saisir une tache"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            required
          />
          <Button variant="primary" onClick={Ajouter}>
            Ajouter
          </Button>
        </InputGroup>
      </form>
      <ListGroup>{PrintTodos}</ListGroup>
      <ListGroup variant="info">
        {" "}
        {Object.keys(ls).map((key) => (
          <li>
            {key}: {ls.getItem(key)}
          </li>
        ))}
      </ListGroup>
      {console.log("printing ", PrintTodos)};
    </div>
  );
}
