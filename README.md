# React + Vite - CRUD OPERATION
This code is a React component that allows you to perform CRUD (Create, Read, Update, Delete) operations on a simple data structure. The component uses local storage to persist the data between sessions. Here's a breakdown of the code:

1.Import necessary libraries and hooks:
->useState and useEffect hooks from React
->ToastContainer and toast from react-toastify for displaying notifications

2.Define the getData function to retrieve data from local storage.

3.Initialize state variables using the useState hook:
->email, name, task for form input fields
->inputValues for storing the list of data items

4.Store data in local storage using the useEffect hook, which runs whenever inputValues changes.

5.Define the submitHandler function to handle form submission:
->Prevent the default form submission behavior
->Check if any of the input fields are empty, and display an error message if they are
->If all fields are filled, add the new data item to the inputValues list and clear the input fields

5.Define the handleEdit function to edit an existing data item:
->Update the name, email, and task state variables with the values of the item to be edited
->Filter out the item with the given index from the inputValues list

6.Define the handleDelete function to delete a data item:
->Filter out the item with the given index from the inputValues list

7.Render the component:
->Display a heading
->Render a ToastContainer for displaying notifications

8.Render a form for adding new data items:
->Input fields for name, email, and task
->A submit button

9.If there are any data items in inputValues, render a table to display them:
->Table headers for Name, Email, Todo Task, and Actions
10.Table rows for each data item:
->Cells for name, email, and task
->Buttons for editing and deleting the item

The component is written in functional component style using React hooks. It uses local storage to persist data between sessions and react-toastify for displaying notifications. The component's UI includes a form for adding new data items and a table for displaying and editing existing items.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# CRUD-OPERATION-in-React
