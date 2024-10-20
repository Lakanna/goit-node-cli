import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      // ...
      break;

    case "get":
      const contactById = await getContactById(id);
      // console.log(typeof id, "id");
      console.log(contactById);
      // ... id
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      // ... name email phone
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
