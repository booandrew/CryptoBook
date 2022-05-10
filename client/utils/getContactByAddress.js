import { contactFactory } from "../contactFactory";
import { Contact } from "../Contact";

export const getContactByAddress = async (contractOwnerAddress) => {
  const contactAddress = await contactFactory.ownerToContact(
    contractOwnerAddress
  );

  console.log({ contactAddress });

  const contact = Contact(contactAddress);

  const telegram = await contact.telegram();
  const discord = await contact.discord();

  return { telegram, discord };
};
