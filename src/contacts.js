import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.join(process.cwd(), "src", "db", "contacts.json");

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
  if (searchedContact === -1) {
    return null;
  }
  return searchedContact;
}
// console.log(await getContactById("e6ywwRe4jcqxXfCZOj_1e"));
// console.log(await getContactById("1"));

async function removeContact(contactId) {
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

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  return deletedContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
}
