'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

const GITHUB_USER = '<manuelainclan>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

//Objetos con cada gatito
// const kittenData_1 = {
//     image: "https://dev.adalab.es/gato-siames.webp",
//     name: "Anastacio",
//     desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
//     race: "Siamés",
// };
// const kittenData_2 = {
//     image: "https://dev.adalab.es/sphynx-gato.webp",
//     name: "Fiona",
//     desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
//     race: "Sphynx",
// };
// const kittenData_3 = {
//     image: "https://dev.adalab.es/maine-coon-cat.webp",
//     name: "Cielo",
//     desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
//     race: "Maine Coon",
// };

let kittenDataList = [];
if (kittenListStored) 
{
    renderKittenList(kittenListStored);

}
else
{
fetch(SERVER_URL, {
  method: 'GET',
  headers: {'Content-Type': 'application/json'},
}).then((response) => response.json())
.then((data) => { 
    kittenDataList = data.results.map((kitten) => ({
        image: kitten.image,
        name: kitten.name,
        desc: kitten.desc,
        race: kitten.race,
    }) )
    console.log(kittenDataList);  

    renderKittenList(kittenDataList);
    localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
})

}
//Completa el código;

//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    console.log(kittenDataList);
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
    const newKittenDataObject = 
    {
    desc:'',
    image:'',
    name:'',
    race:'',
  //completa el código
    };
//Adicionar nuevo gatito
function addNewKitten(event) {

console.log('entro en addNewKitten');
    event.preventDefault();

    newKittenDataObject.desc = inputDesc.value;
    newKittenDataObject.image = inputPhoto.value;
    newKittenDataObject.name = inputName.value;
    newKittenDataObject.race = inputRace.value;

    kittenDataList.push(newKittenDataObject);
    console.log(kittenDataList);
    if (newKittenDataObject.valueDesc === "" || newKittenDataObject.valuePhoto === "" || newKittenDataObject.valueName === "") 
    {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    } else 
    {
        if (newKittenDataObject.valueDesc !== "" || newKittenDataObject.valuePhoto !== "" || newKittenDataObject.valueName !== "") 
        {
            labelMessageError.innerHTML = "¡Mola! un nuevo gatito en Adalab";
            fetch(SERVER_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newKittenDataObject),
            }).then((response) => response.json())
            .then((data) => { 
                if (data.success) {
             newKittenDataObject = data.results.map((kitten) => ({
                 image: kitten.valuePhoto,
                name: kitten.valueName,
                desc: kitten.valueDesc,
                race: kitten.race,
             }) )
            localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
            }
             else{

             }
  })

        }
    }
    renderKittenList(kittenDataList);
    inputDesc.value = '';
    inputPhoto.value = '';
    inputName.value = '';
    inputRace.value = '';
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}
 function prueba(kittenItem) {
        listElement.innerHTML += renderKitten(kittenItem)
    };
//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value.toLowerCase();
    const raceSearchText = input_search_race.value.toLowerCase();
    listElement.innerHTML = "";
    console.log(raceSearchText);
   
    const kittenItemFilter = kittenDataList
    .filter ((kittenItem) => kittenItem.desc.toLowerCase().includes(descrSearchText))
    .filter ((kittenItem) => kittenItem.race.toLowerCase().includes(raceSearchText))
    // .map ((kittenItem) => listElement.innerHTML += renderKitten(kittenItem))
    .map ((kittenItem) => prueba(kittenItem))
    // console.log(kittenItemFilter);   
}

//Mostrar el litado de gatitos en el HTML
// renderKittenList(kittenListStored);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






