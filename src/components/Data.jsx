/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Data = () => {
  //getting data from local storage
  const getData = () => {
    let data = localStorage.getItem("data");
    return data ? JSON.parse(data) : [];
  };

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
          ? (data = { id: data.id, name, task })
          : {
              id: data.id,
              name: data.name,
              description: data.description,
              task: data.task,
            }
      );
      setInputvalues(editedData);
      setName("");

      setTask("");
      setEditid(0);
      return;
    }

    if (!name || !task) {
      toast.error("Please fill out all fields!", {
        position: "top-center",
      });
    }

    if (name !== "" && task !== "") {
      setInputvalues([{ id: `${Date.now()}`, name, task }, ...inputValues]);
      setName("");
      setTask("");
    }
  };

  //   function for edit data

  const handleEdit = (value) => {
    let newData = inputValues.find((data) => data.id === value.id);
    setName(newData.name);
    setTask(newData.task);
    setEditid(value.id);
  };

  //function for delete data from table

  const handleDelete = (id) => {
    let newdelete = inputValues.filter((data) => data.id !== id);
    setInputvalues([...newdelete]);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center gap-4 py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <img
          src="https://www.amitree.com/wp-content/uploads/2021/08/the-pros-and-cons-of-paper-to-do-lists.jpeg"
          alt=""
          width={90}
          className="rounded-md"
        />
        <h3 className="text-4xl text-center font-semibold text-white/80 drop-shadow-md">
          ADD <span className="text-red-500 px-2 ">TO-DO</span>LIST
        </h3>
      </div>

      <ToastContainer />
      <div className="w-full md:w-[50%] mx-auto my-12 text-white  h-full">
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
              className="md:py-2  py-4 px-2 w-full rounded-md mt-1 outline-none bg--800   text-black/65 font-semibold  focus:ring-1 focus:ring-blue-500 focus:ring-offset-blue-500 "
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" text-white/70">
            <label htmlFor="task">Add Task</label>
            <input
              type="text"
              placeholder="Add your task..."
              value={task}
              className="md:py-2 py-4 px-2 w-full rounded-md mt-1  outline-none text-black/65 font-semibold  focus:ring-1 focus:ring-white/70 focus:ring-offset-white/90"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${
              editid
                ? "bg-green-500 rounded-md mt-6 font-semibold py-2 px-4 hover:opacity-100 duration-100 ease-linear opacity-90"
                : "py-4 md:py-2 px-4 bg-blue-500 rounded-md mt-6 font-semibold hover:opacity-100 duration-100 ease-linear opacity-90"
            } `}
          >
            {editid ? "Edit" : "Submit"}
          </button>
        </form>
      </div>

      {inputValues?.length > 0 ? (
        <table className="table md:w-[50%]  mx-auto text-white/85 border-collapse border border-slate-500 w-full">
          <tbody>
            <tr className="">
              <th className="py-3 border border-white/50">Name</th>
              <th className="py-3 border border-white/50">Task</th>
              <th className="py-3 border border-white/50">Actions</th>
            </tr>
          </tbody>

          {inputValues?.map((value, id) => {
            return (
              <Fragment key={id}>
                <tbody>
                  <tr className="text-center text-white/70">
                    <td className="py-2  border border-white/50">
                      {value?.name}
                    </td>

                    <td className=" py-2 border border-white/50">
                      {value?.task}
                    </td>
                    <td className=" py-2 border border-white/50 md:flex md:justify-center md:gap-6 md:items-item">
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
      ) : (
        <>
          {/* <div className="flex justify-center items-center w-full">
            <div className="">
              <img
                src="https://thumbs.dreamstime.com/b/to-do-list-doodle-design-vector-illustration-empty-checklist-143023309.jpg"
                className="rounded-md w-[300px] "
                alt="img"
              />
            </div> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default Data;
