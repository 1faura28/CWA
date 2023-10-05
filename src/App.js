import './App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter,Router,Link, Routes, Route} from "react-router-dom"
import ToDoForm from './components/ToDoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/ToDoList';

// Imports menu pages components
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import NavMenu from "./components/NavMenu";
import NotFound from "./components/NotFound";

// Imports firebase related
import {db, auth, provider} from './config/firebase';
import {collection, addDoc, doc, getDoc, getDocs, deleteDoc, QuerySnapshot, updateDoc} from "firebase/firestore";

// Imports for authetification
import {signInWithPopup} from 'firebase/auth';

/*
function App() {
const [todoList, setTodoList] = useState([
  {
    task: "Sample Task 1", 
    isCompleted: false     
  },
  {
    task: "Sample Task 2",
    isCompleted: false
  }
]); */

// Fetch the data from the firebase
function App() {
  const [user, setUser] = useState (null);
  const [todoList, setTodoList] = useState([]);

  const handleGoogleSignIn = () => {
    signInWithPopup (auth, provider). then ((result) => {
      //console.log (result)
      const user = result.user;
      setUser(user);
    }).catch ((err) => {
      console.error(err);
    });
  }

  const handleLogout = () => {
    setUser(null);
  }

const getAllTask = async () => {
  const collectionRef = collection (db, 'todo');
  await getDocs (collectionRef). then ((QuerySnapshot) => {
    console.log (QuerySnapshot.docs);
      const listOfAllTask = QuerySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setTodoList(listOfAllTask)
  }).catch((err) => {
    console.error ("Couldn't fetch the data:", err);
  })
  };

//use efect hook, whenever the page is loaded it will change the state
  useEffect (() => {
  getAllTask(); 
}, [])

//Add a task
/*
const addTask = newTask => {
  console.log(newTask);
    const newTodoList = [...todoList, {task: newTask, isCompleted: false}]; // As the key field in the todoList is task, so I just added the task key 
    setTodoList(newTodoList);
}; */

// Add a task to firebase
const addTask = async (newTask) => {
    console.log(newTask);
    try {
      const collectionRef = collection (db, 'todo'); //create todo collection on the firebase database db
      const docRef = await addDoc (collectionRef, {   // add the document with the id to the firebase collection
        task: newTask,
        isCompleted: false
      });
        console.log("Document added successfully to Firebase with id" , docRef.id)
      getAllTask();
      //window.location.reload();
    }catch(err){
      console.error("Error Occured, document not added to Firebase", err)
    }
};

//Delete a task
/*
const deleteTask = index => {
    console.log(index);
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);    

};*/

// Delete task from database
const deleteTask = async (id) => {
  try {
    const documentRef = doc (db, "todo", id);
    await deleteDoc (documentRef);
    getAllTask();
    //window.location.reload();
  }catch(err) {
    console.error(err)
  }
};

//Mark as complete
/*
const completeTask = index => {
  console.log(index)
  const newTodoList = [...todoList];
  newTodoList[index].isCompleted === false ? newTodoList[index].isCompleted = true : newTodoList[index].isCompleted = false;
  setTodoList(newTodoList);
}; */

// Mark as complete to be updated on Firebase
const completeTask = async (id) => {
  try {

    const documentRef = doc (db, "todo", id);
    const docSnap = await getDoc (documentRef)
    //console.log (docSnap.data())
    const task = docSnap.data();
    task.isCompleted === false ? task.isCompleted = true : task.isCompleted = false;
    await updateDoc (documentRef, {isCompleted: task.isCompleted})
    getAllTask();
    //window.location.reload();
  }catch(err) {
    console.error(err)
  }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavMenu handleGoogleSignIn = {handleGoogleSignIn} handleLogout={handleLogout} user = {user}/>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/Contact' element = {<Contact />} />
          <Route path='/About' element = {<About />} />
          <Route path='*' element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
    <>
    {user?(
      <>      
        <h1>{user.displayName} Todo List</h1>
        <h1>{user.email}</h1>  
        <ToDoForm addTask= {addTask} />
        <br />
        <TodoList todoList={todoList} completeTask = {completeTask} deleteTask = {deleteTask} /> 
      </>
    ):(
        <h1>You are not logged in</h1>
    )};
    
    </>
    </div>
  );
}

export default App;
