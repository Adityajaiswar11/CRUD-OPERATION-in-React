/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Data = () => {
  //getting data from local storage
  const getData = () => {
    let data = localStorage.getItem("data");
    return data ? JSON.parse(data) : [];
  };

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [editid, setEditid] = useState(0);
  const [inputValues, setInputvalues] = useState(getData());

  //storing data in local storage

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(inputValues));
  }, [inputValues]);

  //   submit inputdata
  const submitHandler = (e) => {
    e.preventDefault();

    //code  for edit data
    if (editid) {
      const editdata = inputValues.find((d) => d.id === editid);
      const editedData = inputValues.map((data) =>
        data.id === editdata.id
          ? (data = { id: data.id, name, description, task })
          : {
              id: data.id,
              name: data.name,
              description: data.description,
              task: data.task,
            }
      );
      setInputvalues(editedData);
      setName("");
      setDescription("");
      setTask("");
      setEditid(0);
      return;
    }

    if (!name || !description || !task) {
      toast.error("Please fill out all fields!", {
        position: "top-center",
      });
    }

    if (name !== "" && description !== "" && task !== "") {
      setInputvalues([
        { id: `${Date.now()}`, name, description, task },
        ...inputValues,
      ]);
      setName("");
      setDescription("");
      setTask("");
    }
  };

  //   function for edit data

  const handleEdit = (value) => {
    let newData = inputValues.find((data) => data.id === value.id);
    setName(newData.name);
    setDescription(newData.description);
    setTask(newData.task);
    setEditid(value.id);
  };

  //function for delete data from table

  const handleDelete = (id) => {
    let newdelete = inputValues.filter((data) => data.id !== id);
    setInputvalues([...newdelete]);
  };

  return (
    <>
      <h3 className="text-2xl text-center font-semibold bg-slate-900 text-red-500/90  py-8 border-b">
        Add your daily todo task
      </h3>
      <ToastContainer />
      <div className="w-full md:w-[80%] mx-auto my-6 text-white  h-full">
        <form
          action=""
          className="w-full flex md:justify-between md:items-center md:gap-10 gap-5 flex-col  md:flex-row justify-center p-1"
          onSubmit={submitHandler}
        >
          <div className="">
            <label htmlFor="name" className="mr-2 py-2 text-white/70">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Add your name..."
              value={name}
              className="md:py-2  py-4 px-2 w-full rounded-md mt-1 outline-none bg-slate-800   focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90 "
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" text-white/70">
            <label htmlFor="description">Description</label>
            <input
              type="description"
              placeholder="Add your description..."
              value={description}
              className="md:py-2  py-4 px-2 w-full rounded-md mt-1 outline-none bg-slate-800  focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className=" text-white/70">
            <label htmlFor="task">Add Task</label>
            <input
              type="text"
              placeholder="Add your task..."
              value={task}
              className="md:py-2 py-4 px-2 w-full rounded-md mt-1  outline-none bg-slate-800  focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${
              editid
                ? "bg-green-500 rounded-md mt-6 font-semibold py-2 px-4"
                : "py-2 px-4 bg-blue-500 rounded-md mt-6 font-semibold"
            } `}
          >
            {editid ? "Edit" : "Submit"}
          </button>
        </form>
      </div>
      {inputValues?.length > 0 && (
        <table className="table md:w-[80%] w-full mx-auto bg-slate-900 text-white/85 border-collapse border border-slate-500">
          <tbody>
            <tr className="bg-slate-600/80">
              <th className="py-3 border border-slate-600 hidden md:flex md:justify-center md:items-center">
                ID
              </th>
              <th className="py-3 border border-slate-600">Name</th>
              <th className="py-3 border border-slate-600">Description</th>
              <th className="py-3 border border-slate-600">Task</th>
              <th className="py-3 border border-slate-600">Actions</th>
            </tr>
          </tbody>

          {inputValues?.map((value, id) => {
            return (
              <Fragment key={id}>
                <tbody>
                  <tr className="text-center text-white/70">
                    <td className="py-2  border-y-none md:border-slate-600 hidden md:flex md:justify-center md:items-center">
                      {value?.id}
                    </td>
                    <td className="py-2  border border-slate-600">
                      {value?.name}
                    </td>
                    <td className="py-2 border border-slate-600">
                      {value?.description}
                    </td>
                    <td className=" py-2 border border-slate-600">
                      {value?.task}
                    </td>
                    <td className=" py-2 border border-slate-600 md:flex md:justify-center md:gap-3 md:items-item">
                      <button
                        onClick={() => handleEdit(value)}
                        className="py-2 md:px-3 px-2 bg-green-500 rounded-md  font-semibold"
                      >
                        {" "}
                        Edit
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(value.id)}
                        className="py-2 md:px-3 px-2 bg-red-500 rounded-md ml-2 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Fragment>
            );
          })}
        </table>
      )}
    </>
  );
};

export default Data;
