import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function App() {
  let input;
  const [Data, setData] = useState([]);
  const createRef = useRef("");
  const [render, setRender] = useState(false);

  const handleSubmit = () => {
    if (!createRef.current.value){
      return;
    }
    fetch(`/.netlify/functions/create`, {
      method: "post",
      body: JSON.stringify(createRef.current.value),
    }).catch((err) => {
      console.log(err);
    });
    createRef.current.value = "";
    setRender(true);
  };

  const handleDelete = (id) => {
    fetch(`/.netlify/functions/delete`, {
      method: "post",
      body: JSON.stringify(id),
    }).catch((err) => {
      console.log(err);
    });
    setRender(true);
  };
  const handleUpdate = (id) => {
    input = prompt("Enter updated value");
    const obj = {
      id,
      name: input,
    };
    fetch(`/.netlify/functions/update`, {
      method: "post",
      body: JSON.stringify(obj),
    }).catch((err) => {
      console.log(err);
    });
    setRender(true);
  };
  useEffect(() => {
    fetch(`/.netlify/functions/read`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
    setRender(false);
  }, [render]);
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: 'wrap',
        }}
      >
        <TextField inputRef={createRef} label="Add" variant="outlined" />
        {/* <input ref={createRef} type="text"></input> */}
        <Button onClick={handleSubmit}>
          <AddIcon />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Data.map((d) => (
          <div
            style={{
              display: "flex",
              border: "2px solid #3F51B5",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
              flexWrap: 'wrap',
              fontWeight: 'bold'
            }}
            key={d.id}
          >
            <span>{d.data.name}</span>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(d.id)}
            >
              <DeleteForeverIcon />
            </Button>
            <Button onClick={() => handleUpdate(d.id)}>
              <EditIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
