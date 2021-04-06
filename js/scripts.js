// User Interface Logic ---------
let addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  // declare another constant for the object emails{}
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".e-mail1").html(contact.emails.email1);
  $(".e-mail2").html(contact.emails.email2);
  $(".e-mail3").html(contact.emails.email3);
  console.log(contact)
  $(".p-address").html(contact.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    // console.log("The id of this <li> is " + this.id + ".");
    showContact(this.id); 
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail1 = $("input#new-email1").val();
    const inputtedEmail2 = $("input#new-email2").val();
    const inputtedEmail3 = $("input#new-email3").val();
    console.log(inputtedEmail1, inputtedEmail2, inputtedEmail3);
    const inputtedAddress = $("input#new-address").val();

    // The next three lines are to make sure to empty out form fields after submission:
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email1").val("");
    $("input#new-email2").val("");
    $("input#new-email3").val("");
    $("input#new-address").val("");

    // create a new variable and assign the email addresses here and then pass that variable into the new Contact as a parameter
    let emailAddresses = new EmailAddresses(inputtedEmail1, inputtedEmail2, inputtedEmail3)
    console.log(emailAddresses);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, emailAddresses, inputtedAddress);
    // console.log(newContact) = {inputtedFirstName, inputtedLastName, inputtedPhoneNumber, array: [2], inputtedAddress)
    addressBook.addContact(newContact);
    // console.log(addressBook.contacts);
    displayContactDetails(addressBook);

  });
});

// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

// Business Logic for Contacts ---------
// What we want to do (pseudo-code): function Contact(firstName, lastName, phoneNumber, emails{email1, email2, email3}, address}
function Contact(firstName, lastName, phoneNumber, emails, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emails = emails;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business Logic for Emails

// if emails{email1, email2, email3}, then dot notation to access this object would be emails.email1, emails.email2, emails.email3, etc.
function EmailAddresses(email1, email2, email3) {
  this.email1 = email1;
  this.email2 = email2;
  this.email3 = email3;
}