//hacer peticion a la api con fetch
fetch('https://swapi.co/api/films/').then(function(response) {
        //console.log(response)

        return response.json(); //convertir a json el resultado de la peticion
    })
    .then(function(data) { //una vez obteniendo respuesta, acceder a su data
        let dataFilms = data.results
            //console.log(dataFilms);
        films(dataFilms);
    })
    .catch(function(error) { //mensaje en caso de no tener exito en la peticion
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });

//funcion para pintar los elementos
const paintFilms = (title, episode, people, indexImage, templatePeople) => {

    let template = `<div class="card-group col-md-4">
       <div class="card">
           <img class="card-img-top" src=${indexImage} alt="Card image cap">
           <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${episode}</p>
               <ul>${templatePeople}</ul>
           </div>
       </div>
   </div>`

    let sectionFilms = document.getElementById("row");
    sectionFilms.innerHTML += template;

};

//funcion para acceder a los datos que se requieren de la data extraida
const films = (dataFilms) => {
    dataFilms.forEach(function(element, index) {
        let imagesArray = ["./assets/images/a-new-hope.jpg", "./assets/images/attack-of-the-clones.jpg", "./assets/images/the-phantom-menace.jpg", "./assets/images/revenge-of-the-sith.jpg", "./assets/images/return-of-the-jedi.jpg", "./assets/images/the-empire-strikes-back.jpg", "./assets/images/the-force-awakens.jpg"]
        let indexImage = imagesArray[index];
        let title = element.title;
        let episode = element.episode_id;
        let people = element.characters;

        let templatePeople = ``;
        people.forEach(function(elemento) {
            templatePeople += `<a class="card-people" href="#modal" data-toggle="modal"><li>${elemento}</li></a>`
                //console.log(elemento)
            fetch(elemento).then(function(response) { //peticion del resultado de la iteracion de people, para acceder a su informacion
                    //console.log(response, "personaje")
                    return response.json();
                })
                .then(function(data) {
                    let name = data.name;
                    let height = data.height;
                    let mass = data.mass;
                    let hairColor = data.hair_color;
                    let skinColor = data.skin_color;
                    //console.log(name, height, mass, hairColor, skinColor);
                    //modal(name, height, mass, hairColor, skinColor);
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                });
        });
        paintFilms(title, episode, people, indexImage, templatePeople)
    });
};

const showModal = () => {
    let characterToShow = $(this).data("modal-title");
    charactersRequest(characterToShow);
    console.log(this)
};

$(document).on("click", ".card-people", showModal);

const charactersRequest = (characterToShow) => {
    fetch(`${characterToShow}`, { answer: 5 }).then(function(response) {
        return response.json().then(function(dataPeople) {
            console.log(dataPeople)
            modalInfo(dataPeople)
        })
    });
};

const modalInfo = (dataPeople) => {
    //console.log(dataPeople)
    const name = dataPeople.name;
    const height = dataPeople.height;
    const hairColor = dataPeople.hair_color;
    const mass = dataPeople.mass;
    const skinColor = dataPeople.skin_color;
    console.log(name, height, hairColor, mass, skinColor)

    modal(name, height, mass, hairColor, skinColor)
};

//funcion para agregarles valores a los elementos html del modal
const modal = (name, height, mass, hairColor, skinColor) => {
    const modalTemplate = `<div class="modal-header">
                            <h5  id="modal-title">${name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
                        </div>
                        <div class="modal-body">
                            <p id="height">${height}</p>
                            <p id="mass">${mass}</p>
                            <p id="hair-color">${hairColor}</p>
                            <p id="skin-color">${skinColor}</p>
                        </div>`;

    const modalContainer = document.getElementById('modal-content');
    modalContainer.innerHTML = modalTemplate

};