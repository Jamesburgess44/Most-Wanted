'use strict';
function assignValues(){
    // Grabbing the values from our nameForm form and inputs to use in the filterDataBase
    let firstNameInput = document.forms['criteriaForm']['fname'].value;
    let lastNameInput = document.forms['criteriaForm']['lname'].value;
    let genderInput = document.forms['criteriaForm']['gender'].value;
    let dobInput = fixDateInput(document.forms['criteriaForm']['dob'].value);
    let heightInput = document.forms['criteriaForm']['height'].value;
    let weightInput = document.forms['criteriaForm']['weight'].value;
    let eyeColorInput = document.forms['criteriaForm']['eyeColor'].value;
    let occupationInput = document.forms['criteriaForm']['occupation'].value;
    return [inputCasing(firstNameInput), inputCasing(lastNameInput), genderInput.toLowerCase(), dobInput, heightInput, weightInput, eyeColorInput.toLowerCase(), occupationInput.toLowerCase()]
}
function inputCasing(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//to fix date input to 
function fixDateInput(date){
    if(date[3] == "0"){
        date = date.slice(0, 3) + date.slice(4)
    }
    if(date[0] == "0"){
        date = date.slice(1)
    }
    return date;
}

function filterDataBase(keywords){
    //we want to take in all the form values that the use inputs then filter the database using each of the values that the user inputs
    let peopleKeys = ["firstName", "lastName", "gender", "dob", "height", "weight", "eyeColor", "occupation"] //these are the Keys in data.js that we want to search through
    var filteredPeople = people.filter(function (person) {
      let didFail = false; //use this flag to stop from returning too early. needed to make sure database is filtered multiple times
      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] != "") {
          let keyArrIndex = peopleKeys[i];
          if (keywords[i] != person[`${keyArrIndex}`]) {
            didFail = true;
          }
        }
      }
      if (!didFail) {
        return true;
      }
      return false;
    });
    if (filteredPeople.length == 0) {
      window.alert("Invalid Search Criterion");
    }
    buildTable(filteredPeople);
}

function buildTable(dataBaseOfPeople){
    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("tableHead").innerHTML = ` <tr>
    <th>Id</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>gender</th>
    <th>dob</th>
    <th>height</th>
    <th>weight</th>
    <th>eyeColor</th>
    <th>occupation</th>
    </tr>`;
    dataBaseOfPeople.map(function(el){
        document.getElementById("tableBody").innerHTML += `<tr>
        <td id=${el.id} style="color:red">${el.id}</td>
        <td>${el.firstName}</td>
        <td>${el.lastName}</td>
        <td>${el.gender}</td>
        <td>${el.dob}</td>
        <td>${el.height}</td>
        <td>${el.weight}</td>
        <td>${el.eyeColor}</td>
        <td>${el.occupation}</td>
        <td><button onclick="buildDescendants(${people.indexOf(el)})">Descendants</button></td>                 
        <td><button onclick="buildImmediateFamily(${people.indexOf(el)})">Immediate Family</button></td>
        </tr>`
    })
}
function buildDescendants(index){
    descendants =[];
    findKids(index)
    if(descendants.length > 0){
        buildSecondaryTable(descendants)
        }
        else{
            window.alert("This person has no descendants");
        }
}
function buildImmediateFamily(index){
    immediateFamily = [];
    findSiblings(index)
    findParents(index)
    findSpouse(index)
    if(immediateFamily.length > 0){
        buildSecondaryTable(immediateFamily)
        }
        else{
            window.alert("This person has no immediate family!")
    }
}
let immediateFamily = [];
let descendants =[];

function findSiblings(personsIndex){
    //we want to search through the people database for persons with same parentIDs
    
    let currentPersonParents = people[personsIndex].parents;
    let currentPersonID = people[personsIndex].id;
    if(currentPersonParents.length == 0){
        console.log("no parents");
        return false;
    }
    else{
        let siblings = people.filter(function(person){
            if((currentPersonParents[0] == person.parents[0] && currentPersonParents[1] == person.parents[1]) && currentPersonID != person.id){
                person.relationship = "Sibling";
                immediateFamily.push(person)
                return true;
            }
            else{
                return false;
            }
        })
    }   
}

function findParents(personIndex){
    let currentPersonParents = people[personIndex].parents;
    let parents = people.filter(function(person){
        if(currentPersonParents[0] == person.id || currentPersonParents[1] == person.id){
            person.relationship = "Parent";
            immediateFamily.push(person)
        return true;
    }
    else{
        return false;
    }
})
}

function findSpouse(personIndex){
    let currentPersonSpouse = people[personIndex].currentSpouse;
    let spouse = people.filter(function(person){
        if(currentPersonSpouse == person.id){
            person.relationship = "Spouse";
            immediateFamily.push(person)
            return true;
        }
        else{
            return false;
        }
    })

}

function buildSecondaryTable(dataBaseOfPeople){
    document.getElementById("secondTableBody").innerHTML = "";
    document.getElementById("secondTableHead").innerHTML = ` <tr>
        <th>Id</th>
        <th>Relationship</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>gender</th>
        <th>dob</th>
        <th>height</th>
        <th>weight</th>
        <th>eyeColor</th>
        <th>occupation</th>
        </tr>`;
    dataBaseOfPeople.map(function(el){
        document.getElementById("secondTableBody").innerHTML += `<tr>
        <td id=${el.id} style="color:red">${el.id}</td>
        <td>${el.relationship}</td>
        <td>${el.firstName}</td>
        <td>${el.lastName}</td>
        <td>${el.gender}</td>
        <td>${el.dob}</td>
        <td>${el.height}</td>
        <td>${el.weight}</td>
        <td>${el.eyeColor}</td>
        <td>${el.occupation}</td>
        </tr>`
    })
}

function findKids(currentPersonIndex){
    //search database for this persons ID under each other persons parent property
    let currentPersonID = people[currentPersonIndex].id;
    let kids = people.filter(function (person){
        if(currentPersonID == person.parents[0] || currentPersonID == person.parents[1]){
            person.relationship = "Descendant";
            descendants.push(person);
            findKids(people.indexOf(person))
            return true;
        }
        else{
            return false;
        }
        
    })
}


