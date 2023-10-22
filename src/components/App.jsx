import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, deleteContacts } from 'redux/contactsReducer';
import { setFilter } from 'redux/filterReducer';

const App = () => {
  const contacts = useSelector((state) => state.contacts.contacts );
  const filter = useSelector((state) => state.filter.filter );
  const dispatch = useDispatch();
  

  // const [contacts, setContacts] = useState(() => {
  //   return JSON.parse(localStorage.getItem('contacts')) ?? [];
  // });
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const stringifiedContacts = JSON.stringify(contacts);
  //   localStorage.setItem('contacts', stringifiedContacts);
  // }, [contacts]);

  const addContact = newContact => {
    const contactExist = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (contactExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }dispatch(addContacts(newContact))
    // setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    dispatch(deleteContacts(id))
    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== id)
    // );
  };

  const handleFilterChange = filter => {
    dispatch(setFilter(filter));
    // setFilter(filter);
  };

  // const getFilteredContacts = contacts.filter(({ name }) =>
  //   name.toLowerCase().includes(filter.toLowerCase())
  // );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <Filter filter={filter} onFilter={handleFilterChange} />
      <h2>Contacts</h2>
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
