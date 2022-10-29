//import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "../css/App.css";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "../utils/ContactsAPI"
import CreateContact from "./CreateContact";

const App = () => {
  let navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  //const [screen, setScreen] = useState("list");

  const removeContact = (contact) => {
    ContactsAPI.remove(contact);
    //setContacts(ContactsAPI.getAll());
    setContacts(contacts.filter(c => c.id !== contact.id));
  }
  const createContact = (contact) => {
    const create = async () => {
      const resp = await ContactsAPI.create(contact);
      setContacts(contacts.concat(resp));
    }

    create();

    navigate("/");
  }

  
  //----------------
  /*
  ** useEffect to do something after lifecycle of elements such as retrieve data from external source
  ** This hook allows us to run special code or custom logic at specific points of a component's lifecycle, 
    including after the component is mounted to the DOM, after the component is updated, 
    and even before the component is destroyed (i.e., unmounted from the DOM).
  1.To be able to use the hook in the first place, we import useEffect.
  2. We then place useEffect() directly inside the component.
    The first argument is a function. Within it, we make an asynchronous request to our Contacts API. 
    When it resolves, we pass the response into setContacts(), which updates our contacts state.
    The second argument is an empty array. 
    We include this because we want the effect to run only during mount and unmount 
    (i.e., not after every time props or state changes). 
    The empty array also tells React that there are no dependencies needed.
  
  **Recap
    The useEffect hook is versatile, and mimics the lifecycle methods that React developers 
    typically leverage in their applications. 
    It's a great way to run custom functions or logic at specific points of a component's lifecycle, 
    especially at the time it's mounted to the DOM.  
  */
  useEffect(()=> {
    // Set async function 
    const getContacts = async () => {
      const resp = await ContactsAPI.getAll();
      setContacts(resp);
    };
    //Call the async function
    getContacts();
  }, []); 
  //---------------------
  return (
    <Routes>
      <Route 
        exact path="/" 
        element={<ListContacts Contacts={contacts} onDeleteContact={removeContact}/>} 
      />
      <Route 
        path="/create" 
        element={<CreateContact onCreateContact={ (contact) => {createContact(contact)}}/>}
      />
    </Routes>
  )
};

export default App;

/*
      {/*<div>
        screen === "list" && (<ListContacts Contacts={contacts} onDeleteContact={removeContact} onNavigate={()=>{
          setScreen("create")
        }}/>)
        screen === "create" && (<CreateContact />)
      </div>
*/
/*
        <ListContacts Contacts={contacts} onDeleteContact={removeContact}/>
        <CreateContact />

        const [contacts, setContacts] = useState([
    {
      id: "karen",
      name: "Karen Isgrigg",
      handle: "@karen_isgrigg",
      avatarURL: "http://localhost:5001/karen.jpg",
    },
    {
      id: "richard",
      name: "Richard Kalehoff",
      handle: "@richardkalehoff",
      avatarURL: "http://localhost:5001/richard.jpg",
    },
    {
      id: "tyler",
      name: "Tyler McGinnis",
      handle: "@tylermcginnis",
      avatarURL: "http://localhost:5001/tyler.jpg",
    },
  ]); 
*/