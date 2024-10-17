import { nanoid } from "nanoid";
import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

// console.log(contactsPath);

export async function listContacts() {
  const contactsList = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(contactsList);
}
// const res = await listContacts();
// console.log(res);

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contact.id === contactId);
  if (searchedContact === undefined) {
    return null;
  }
  return searchedContact;
}
// console.log(await getContactById("05olLMgyVQdWRwgKfg5J"));
// console.log(await getContactById("1"));

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const deletedContactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (deletedContactIdx === -1) {
    return null;
  }

  const deletedContact = contacts[deletedContactIdx];
  const updatedContacts = [
    ...contacts.slice(0, deletedContactIdx),
    ...contacts.slice(deletedContactIdx + 1),
  ];

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return deletedContact;
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const newContact = { name, email, phone, id: nanoid() };

  const contactsList = await listContacts();

  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
}
// addContact("Don Kihot", "don@gmail.com", "380974657987");
