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
const paintFilms = (title, episode, people) => {
    let cardGroup = document.createElement("div");
    let card = document.createElement("div");
    let imgCard = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardEpisode = document.createElement("p");
    let cardPeople = document.createElement("a");

    cardGroup.className = "card-group col-md-4";
    card.className = "card";
    imgCard.className = "card-img-top";
    imgCard.setAttribute("src", "https://dummyimage.com/400x300/000/fff");
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardTitle.innerText = title;
    cardEpisode.className = "card-episode";
    cardEpisode.innerText = episode;
    cardPeople.className = "card-people";
    cardPeople.setAttribute("href", "#modal");
    cardPeople.setAttribute("data-toggle", "modal");
    cardPeople.innerText = people;

    card.appendChild(imgCard);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardEpisode);
    cardBody.appendChild(cardPeople);
    card.appendChild(cardBody);
    cardGroup.appendChild(card);

    let sectionFilms = document.getElementById("section-films");
    sectionFilms.appendChild(cardGroup);

};

//funcion para acceder a los datos que se requieren de la data extraida
const films = (dataFilms) => {
    dataFilms.forEach(function(element) {
        let title = element.title;
        //console.log(title)
        let episode = element.episode_id;
        //console.log(episode)
        let people = element.characters;
        //console.log(people)
        people.forEach(function(index) {
            //console.log(index)
            // var arrayPeople = [];
            // arrayPeople += index;
            // console.log(arrayPeople)
            fetch(index).then(function(response) { //peticion del resultado de la iteracion de people, para acceder a su informacion
                    console.log(response, "personaje")
                    return response.json();
                })
                .then(function(data) {
                    let name = data.name;
                    let height = data.height;
                    let mass = data.mass;
                    let hairColor = data.hair_color;
                    let skinColor = data.skin_color;
                    console.log(name, height, mass, hairColor, skinColor);
                    modal(name, height, mass, hairColor, skinColor);
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                });

        });
        paintFilms(title, episode, people)
    });
};


//funcion para agregarles valores a los elementos html del modal
const modal = (name, height, mass, hairColor, skinColor) => {
    let titleModal = document.getElementById("modal-title");
    let containerHeight = document.getElementById("height");
    let containerMass = document.getElementById("mass");
    let containerHairColor = document.getElementById("hair-color");
    let contianerSkinColor = document.getElementById("skin-color");

    titleModal.innerText = name;
    containerHeight.innerText = height;
    containerMass.innerHTML = mass;
    containerHairColor.innerText = hairColor;
    contianerSkinColor.innerText = skinColor;
};