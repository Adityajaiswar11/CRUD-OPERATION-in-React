/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Data = () => {
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
  const [task, setTask] = useState("");
  const [inputValues, setInputvalues] = useState(getData());

  //storing data in local storage

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(inputValues));
  }, [inputValues]);

  //   submit inputdata
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !task) {
      toast.error("Please fill out all fields!", {
        position: "top-center",
      });
    }

    if (name !== "" && email !== "" && task !== "") {
      setInputvalues([...inputValues, { email, name, task }]);
      setEmail("");
      setTask("");
      setName("");
    }
  };

  //   function for edit data

  const handleEdit = (value, id) => {
    setEmail(value.email);
    setName(value.name);
    setTask(value.task);
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
      <h3 className="text-2xl text-center font-semibold bg-slate-900 text-white/80 border-b py-4">
        CRUD OPERATION IN REACT
      </h3>
      <ToastContainer />
      <div className="w-[80%] mx-auto my-6 bg-slate-900 flex justify-evenly items-start text-white p-2 h-full rounded-md">
        <form
          action=""
          className="form flex justify-between items-center gap-10"
          onSubmit={submitHandler}
        >
          <div className="p-3">
            <label htmlFor="name" className="mr-2 py-2 text-white/70">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Add your name..."
              value={name}
              className="py-2 px-6 rounded-md mt-1 outline-none bg-slate-800   focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90 "
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" text-white/70">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              placeholder="Add your email..."
              value={email}
              className="py-2 px-6 rounded-md mt-1 outline-none bg-slate-800  focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="p-3 text-white/70">
            <label htmlFor="task">Add your today's Task</label>
            <input
              type="text"
              placeholder="Add your email..."
              value={task}
              className="py-2 px-6 rounded-md mt-1  outline-none bg-slate-800  focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-red-500 rounded-md mt-3"
          >
            Submit
          </button>
        </form>
      </div>
      {inputValues.length > 0 && (
        <table className="table w-[80%] mx-auto bg-slate-900 text-white/85 border-collapse border border-slate-500">
          <tbody>
            <tr className="bg-red-500/80">
              <th className="py-3 border border-slate-600">Name</th>
              <th className="py-3 border border-slate-600">Email</th>
              <th className="py-3 border border-slate-600">Todo Task</th>
              <th className="py-3 border border-slate-600">Actions</th>
            </tr>
          </tbody>

          {inputValues?.map((value, id) => {
            return (
              <>
                <tbody>
                  <tr className="text-center text-white/70" key={id}>
                    <td className="py-2 border border-slate-600">
                      {value?.name}
                    </td>
                    <td className="py-2 border border-slate-600">
                      {value?.email}
                    </td>
                    <td className="py-2 border border-slate-600">
                      {value?.task}
                    </td>
                    <td className="py-2 border border-slate-600">
                      <button
                        onClick={() => handleEdit(value, id)}
                        className="py-2 px-3 bg-green-500 rounded-md  font-semibold"
                      >
                        {" "}
                        Edit
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(id)}
                        className="py-2 px-3 bg-red-500 rounded-md ml-2 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      )}
    </>
  );
};

export default Data;
