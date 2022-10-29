import PropTypes from "prop-types";
import { useState } from "react";

const ListContacts = ({Contacts, onDeleteContact, onNavigate}) => {
    //console.log(Contacts);
    const [query, setQuery] = useState("");
    const UpdateQuery = (query) => {
        setQuery(query.trim());
    }

    const clearQuery = () => {
        UpdateQuery("");
    }

    const showingContacts = query === "" 
    ? Contacts 
    : Contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="list-contacts">
            <div className="list-contacts-top">
                <input  
                className="search-contacts" 
                type="text" 
                placeholder="Search Contacts" 
                value={query}
                onChange={(e) => UpdateQuery(e.target.value)}
                />
                <a href="#create" onClick={onNavigate} className="add-contact">Add Contact</a>
            </div>

            {
                showingContacts.length !== Contacts.length && (
                    <div className="showing-contacts">
                        <span>
                            Now showing {showingContacts.length} of {Contacts.length}
                        </span>
                        <button onClick={clearQuery}>Show All</button>
                    </div>
                )

            }



            <ol className="contacts-list">
                {
                    showingContacts.map((contact) => {
                        return (
                            <li key={contact.id} className="contact-list-item">
                                <div className="contact-avatar" style={{
                                    backgroundImage: `url(${contact.avatarURL})`,
                                }}>
                                </div>
                                <div className="contact-details">
                                    <p>{contact.name}</p>
                                    <p>{contact.handle}</p>
                                </div>
                                <button className="contact-remove" 
                                onClick={()=> onDeleteContact(contact)}>Remove</button>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
};

ListContacts.propTypes = {
    Contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default ListContacts;