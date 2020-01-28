// Backend Logic 

  //Address Book logic
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
};

AddressBook.prototype.assignId = function(){
  this.currentId++;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
};

  //Contact logic
function Contact(firstName, lastName, phoneNumber, physicalAddress, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.physicalAddress = physicalAddress;
  this.emailAddress = emailAddress;
}

 Contact.prototype.fulllName = function(){
   return `${this.firstName} ${this.lastName}`
 }


// UI
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += `<li id="${contact.id}">${contact.firstName} ${contact.lastName}</li>`
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".physical-address").html(contact.physicalAddress);
  $(".email-address").html(contact.emailAddress);

}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    console.log(this.id)
    showContact(this.id);
  });
    $("#show-contact").hide();
    displayContactDetails(addressBook);
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val('');
    $("input#new-physical-address").val('');
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPhysicalAddress, inputtedEmailAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);

  })
})

