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
function Contact(firstName, lastName, phoneNumber, addresses, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = addresses;
  this.emailAddress = emailAddress;
}

 Contact.prototype.fulllName = function(){
   return `${this.firstName} ${this.lastName}`
 }

 function Address(address, typeOfAddress){
   this.address = address;
   this.typeOfAddress = typeOfAddress;
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

  contact.addresses.forEach(function(address,i){
    $("ul#addresses").append(`<li id=${i}> ${address.typeOfAddress}: ${address.address}</li>`)
  })

  $(".email-address").html(contact.emailAddress);

}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
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
    var inputtedAddress1Type = $("input#new-address1-type").val();
    var inputtedAddress1Location = $("input#new-address1-location").val();
    var inputtedAddress2Type = $("input#new-address2-type").val();
    var inputtedAddress2Location = $("input#new-address2-location").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val('');
    $("input#new-address").val('');
    var inputtedAddress = [];
    var address1 = new Address(inputtedAddress1Location,inputtedAddress1Type);
    var address2 = new Address(inputtedAddress2Location,inputtedAddress2Type);
    inputtedAddress.push(address1)
    inputtedAddress.push(address2)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, inputtedEmailAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);

  })
})

