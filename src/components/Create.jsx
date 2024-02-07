import { useEffect, useState } from "react";

const Create = () => {
      //getting data from local storage    
const getData = () => {
    let data = localStorage.getItem("data");
    if (data == []) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [inputValues, setInputvalues] = useState(getData());

  //storing data in local storage

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(inputValues));
  }, [inputValues]);

  //   submit data
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !number) {
      alert("All fields are required");
    }

    if (name !== "" && email !== "" && number !== "") {
      setInputvalues([...inputValues, { email, name, number }]);
      setEmail("");
      setNumber("");
      setName("");
    }
  };

  //   function for edit data

  const handleEdit = (value, id) => {
    setEmail(value.email);
    setName(value.name);
    setNumber(value.number);
    let newData = inputValues.filter((data, i) => i !== id);
    setInputvalues(newData);
  };

  //function for delete data from table

  const handleDelete = (id) => {
    let newData = inputValues.filter((data, i) => i !== id);
    setInputvalues(newData);
  };

  return (
    <>
      <h3>CRUD OPERATION IN REACT</h3>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            placeholder="Add your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="number">Your Mobile number</label>
          <input
            type="number"
            placeholder="Add your email..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            placeholder="Add your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </tbody>

        {inputValues?.map((value, id) => {
          return (
            <>
              <tbody>
                <tr className="row-data" key={id}>
                  <td>{value?.name}</td>
                  <td>{value?.email}</td>
                  <td>{value?.number}</td>
                  <td className="actions">
                    <button onClick={() => handleEdit(value, id)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Create;
