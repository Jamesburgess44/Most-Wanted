'use strict';
function assignValues(){
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['criteriaForm']['fname'].value;
    let lastNameInput = document.forms['criteriaForm']['lname'].value;
    let genderInput = document.forms['criteriaForm']['gender'].value;
    let dobInput = document.forms['criteriaForm']['dob'].value;
    let heightInput = document.forms['criteriaForm']['height'].value;
    let weightInput = document.forms['criteriaForm']['weight'].value;
    let eyeColorInput = document.forms['criteriaForm']['eyeColor'].value;
    let occupationInput = document.forms['criteriaForm']['occupation'].value;
    return [firstNameInput, lastNameInput, genderInput, dobInput, heightInput, weightInput, eyeColorInput, occupationInput]
}

function filterDataBase(keywords){
    let keyArrayExample = ["firstName", "lastName", "gender", "dob", "height", "weight", "eyeColor", "occupation"]
    
    var filter = people.filter(function(person){
        let didFail = false;
        for(let i = 0; i < keywords.length; i++){
            if(keywords[i] != ""){
                let keyArrIndex = keyArrayExample[i]; //+1 since we arent searching for ID
                if(keywords[i] != person[`${keyArrIndex}`]){
                    didFail = true;
                }
            }
        }
        if(!didFail){
            return true;
        }
        return false;
    }) 
    if(filter.length == 0) {window.alert("Invalid Search Criterion")
}
    buildTable(filter)
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
    <th>parents</th>
    <th>currentSpouse</th>
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
    <td>${el.parents}</td>
    <td>${el.currentSpouse}</td>
    <td><button onclick="descendants()">Descendants</button></td>
    <td><button onclick="findSiblings(${people.indexOf(el)}),findParents(${people.indexOf(el)}),findSpouse(${people.indexOf(el)})">Immediate Family</button></td>
    </tr>`
})
}

let immediateFamily = [];

function findSiblings(personsIndex){
    //we want to search through the people database for persons with same parentIDs
    
    let currentPersonParents = people[personsIndex].parents;
    let currentPersonID = people[personsIndex].id;
    //console.log(currentPersonParents);
    if(currentPersonParents.length == 0){
        console.log("no parents");
        return false;
    }
    else{
        let siblings = people.filter(function(person){
            if((currentPersonParents[0] == person.parents[0] && currentPersonParents[1] == person.parents[1]) && currentPersonID != person.id){
                immediateFamily.push(person)
                return true;
            }
            else{
                return false;
            }
        })
        //immediateFamily.push(siblings);
        //console.log(siblings);
        //console.log(immediateFamily)
    }   
}

function findParents(personIndex){
    let currentPersonParents = people[personIndex].parents;
    let currentPersonID = people[personIndex].id
    let parents = people.filter(function(person){
        if(currentPersonParents[0] == person.id || currentPersonParents[1] == person.id){
            immediateFamily.push(person)
        return true;
    }
    else{
        return false;
    }
})
//console.log(parents);
//immediateFamily.push(parents);
//console.log(immediateFamily)
}

function findSpouse(personIndex){
    let currentPersonSpouse = people[personIndex].currentSpouse;
    let spouse = people.filter(function(person){
        if(currentPersonSpouse == person.id){
            immediateFamily.push(person)
            return true;
        }
    else{
        return false;
    }
    })
    //console.log(spouse)
    //immediateFamily.push(spouse)
    //console.log(immediateFamily)
    buildImmediateFamilyTable(immediateFamily)
}

function buildImmediateFamilyTable(dataBaseOfPeople){
    document.getElementById("secondTableBody").innerHTML = "";
    document.getElementById("secondTableHead").innerHTML = ` <tr>
    <th>Id</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>gender</th>
    <th>dob</th>
    <th>height</th>
    <th>weight</th>
    <th>eyeColor</th>
    <th>occupation</th>
    <th>parents</th>
    <th>currentSpouse</th>
</tr>`;
dataBaseOfPeople.map(function(el){
    document.getElementById("secondTableBody").innerHTML += `<tr>
    <td id=${el.id} style="color:red">${el.id}</td>
    <td>${el.firstName}</td>
    <td>${el.lastName}</td>
    <td>${el.gender}</td>
    <td>${el.dob}</td>
    <td>${el.height}</td>
    <td>${el.weight}</td>
    <td>${el.eyeColor}</td>
    <td>${el.occupation}</td>
    <td>${el.parents}</td>
    <td>${el.currentSpouse}</td>
    <td><button onclick="descendants()">Descendants</button></td>
    <td><button onclick="findSiblings(${people.indexOf(el)}),findParents(${people.indexOf(el)}),findSpouse(${people.indexOf(el)})">Immediate Family</button></td>
    </tr>`
})
}


//function descendants()
