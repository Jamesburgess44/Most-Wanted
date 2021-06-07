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



    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        if(person.firstName === firstNameInput || person.lastName === lastNameInput || person.gender === genderInput ||
            person.dob === dobInput || person.height === heightInput || person.weight == weightInput ||
            person.eyeColor === eyeColorInput || person.occupation === occupationInput ){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        console.log(filteredPeople);
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}


let keywordsExample = ["", "Madden", "male", "" , "70", ""]

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
    console.log(filter);
}



function buildTable(dataBaseOfPeople){
dataBaseOfPeople.map(function(el){
    document.getElementById("data").innerHTML += `<tr>
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
    <td><button onclick="deletePerson()">Delete</button></td>
    </tr>`
})
}


