let validateemailaddress = document.getElementById("email");
let dobvalidateelement = document.getElementById("dob");

let formdataelement = document.getElementById("forminputdata");

let adddatatolocal = (event) => {
    event.preventDefault();

    let checkboxelement = document.getElementById("inputcheckbox").checked;

    let dobelement = document.getElementById("dob").value;

    let passwordelement = document.getElementById("password").value;

    let emailelement = document.getElementById("email").value;

    let nameelement = document.getElementById("name").value;

    let objecttopush = {
        checkboxelement,
        dobelement,
        emailelement,
        passwordelement,
        nameelement,
    };

    dataweget.push(objecttopush);

    localStorage.setItem("user_entries", JSON.stringify(dataweget));

    displaydatafromlocalstorage();
};

formdataelement.addEventListener("submit", adddatatolocal);

let fetchdatafromlocalstorage = () => {
    let dataweget_temp = localStorage.getItem("user_entries");

    if (dataweget_temp) dataweget_temp = JSON.parse(dataweget_temp);
    else dataweget_temp = [];

    return dataweget_temp;
};

function valid(element) {
    const checkemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (
        validateemailaddress.value == "" ||
        !checkemail.test(validateemailaddress.value)
    ) {
        element.setCustomValidity(
            "The entered email is not accurate please check again and enter a valid email address."
        );
        element.reportValidity();
    } else {
        element.setCustomValidity("");
    }
}

validateemailaddress.addEventListener("input", () => {
    const emailRegexInout = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidornotcheck = emailRegexInout.test(validateemailaddress.value);
    if (!isValidornotcheck) {
        validateemailaddress.setCustomValidity(
            "The entered email is not accurate please check again and enter a valid email address."
        );
        validateemailaddress.reportValidity();
    } else {
        validateemailaddress.setCustomValidity("");
    }
});

dobvalidateelement.addEventListener("input", () => {
    let presentday = new Date();
    let dateofbirth_temp = new Date(dobvalidateelement.value);
    let ageinmilliseconds = presentday - dateofbirth_temp;

    let ageinyears = ageinmilliseconds / 365.25 / 24 / 60 / 60 / 1000;

    if (ageinyears < 18 || ageinyears > 55) {
        dobvalidateelement.setCustomValidity(
            "The Entered age is not in the range of 18 to 55 years"
        );
        dobvalidateelement.reportValidity();
    } else {
        dobvalidateelement.setCustomValidity("");
    }
});

let dataweget = fetchdatafromlocalstorage();

let displaydatafromlocalstorage = () => {
    let datafromlocalstorage_temp = localStorage.getItem("user_entries");

    if (datafromlocalstorage_temp)
        datafromlocalstorage_temp = JSON.parse(datafromlocalstorage_temp);
    else datafromlocalstorage_temp = [];

    let tabledatarows = datafromlocalstorage_temp
        .map((eachdatavaluefromlocalstorage) => {
            let emaildisplayelement = `<td>${eachdatavaluefromlocalstorage.emailelement}</td>`;
            let dobdisplayelement = `<td>${eachdatavaluefromlocalstorage.dobelement}</td>`;
            let checkboxdisplayelement = `<td>${eachdatavaluefromlocalstorage.checkboxelement}</td>`;
            let namedisplayelement = `<td>${eachdatavaluefromlocalstorage.nameelement}</td>`;
            let passworddisplayelement = `<td>${eachdatavaluefromlocalstorage.passwordelement}</td>`;

            let rowdisplayelement = `<tr>${namedisplayelement} ${emaildisplayelement} ${passworddisplayelement} ${dobdisplayelement}   ${checkboxdisplayelement}    </tr>`;

            return rowdisplayelement;
        })
        .join("\n");

    let tabledisplayelement = `<table  class="tableoutputfromlocal"  id='tabledata' >
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tabledatarows}
    </table>`;

    let tabledataoutput = document.getElementById("tabledataoutput");

    tabledataoutput.innerHTML = tabledisplayelement;
};

displaydatafromlocalstorage();

validateemailaddress.addEventListener("input", () =>
    valid(validateemailaddress)
);

let submitdatabutton = document.getElementById("submitdatabutton");

submitdatabutton.addEventListener("click", () => valid(validateemailaddress));
