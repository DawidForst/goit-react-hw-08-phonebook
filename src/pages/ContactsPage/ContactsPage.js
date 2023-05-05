import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddContact from "../../components/AddContact/AddContact";
import Filter from "../../components/Filter/Filter";
import ContactList from "../../components/ContactList/ContactList";
import { addContact } from "../../redux/actions/contactActions";
import { auth } from "../../firebase";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddContact = (name, phone) => {
    dispatch(addContact(name, phone));
  };

  const handleFilterContacts = (filter) => {
    setFilterText(filter);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddContact handleAddContact={handleAddContact} />
      <Filter onFilter={handleFilterContacts} />
      <ContactList filterText={filterText} />
    </>
  );
}
