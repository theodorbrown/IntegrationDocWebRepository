var prev = function() {
    var carousel = document.getElementById('carousel');
    carousel.prev();
  };
  
  var next = function() {
    var carousel = document.getElementById('carousel');
    carousel.next();
  };

  


document.addEventListener('init', function(event) {
    //ons-page (event.target)
    var page = event.target;
    const navigator = document.getElementById("myNavigator");
  
    if (page.id === 'page1') {
         ChargerMassifs(page);
    }
    else if (page.id === 'page2') {
        ChargerStations(page);
        page.querySelector('ons-toolbar .center').innerHTML += " " + page.data.title + " " + page.data.id;
    }
    else if (page.id === 'page3') {
        page.querySelector('ons-toolbar .center').innerHTML += " " + page.data.title + " " + page.data.id;
    }
   if (page.id === 'tab2') {
        chargerMeteo(page);
    }
    if (page.id === 'tab3') {
        const mapid = page.querySelector("#macarte");
        var map = L.map(mapid).setView([48.03795, 6.97124], 11.3);
        chargerCarte(navigator.topPage, map);
        chargerPistes(navigator.topPage, map);
    }
});

//2
function goPageStations(event) {
  document.querySelector('#myNavigator').pushPage('page2.html',
  { data : { 
        title : event.currentTarget.dataset.nom,
        id: event.currentTarget.dataset.id
    }
  });
}

//4
function goPageStation(event) {
    document.querySelector('#myNavigator').pushPage('page3.html',
    { data : {
          title : event.currentTarget.dataset.nom,
          id: event.currentTarget.dataset.id,
          lng: event.currentTarget.dataset.lng,
          lat: event.currentTarget.dataset.lat,
      }
    });
}

//1
async function ChargerMassifs(page) {
    const data = await fetch("https://workshop.neotechweb.net/ws/skimap/1.0.0/massifs.php");
    const json = await data.json();
    const list = page.querySelector("ons-list");
    const template = page.querySelector("#template-massif");
    
    json.forEach(elt => {
        const clone = document.importNode(template.content, true);

        const onslistitem = clone.children[0]; // Premier enfant -> item complet
        onslistitem.dataset.id = elt.id;
        onslistitem.dataset.nom = elt.nom;

        const items = clone.querySelectorAll("span");
        items[0].textContent = elt.nom;
        items[1].textContent = `${elt.stations} stations`;

        list.appendChild(clone);
    });
}

//3
async function ChargerStations(page) {
    const data = await fetch(`https://workshop.neotechweb.net/ws/skimap/1.0.0/stations.php?massif=${page.data.id}`);
    const json = await data.json();
    const list = page.querySelector("ons-list");
    const template = page.querySelector("#template-station");
    
    json.forEach(elt => {
        const clone = document.importNode(template.content, true);

        const button = clone.querySelector('ons-button');
        button.dataset.id = elt.id;
        button.dataset.nom = elt.nom;
        button.dataset.lng = elt.lng;
        button.dataset.lat = elt.lat;

        const items = clone.querySelectorAll("span.contenu");
        items[0].textContent = elt.nom;
        items[1].textContent = `${elt.pistes} pistes`;
        items[2].textContent = `${elt.altitude_maxi ?? `-`} alt max`;
        items[3].textContent = `${elt.altitude_mini ?? `-`} alt mini`;

        list.appendChild(clone);
    });
}

function chargerMeteo(page) {
    const template = page.querySelector("#template-meteo");
    const jour = new Date();
    for(var i = 0 ; i < 10 ; i++) {
        const clone = document.importNode(template.content, true);
        const title = clone.querySelector(".title");
        title.textContent = jour.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        page.children[0].appendChild(clone);
        jour.setDate(jour.getDate() + 1);
    }
}

function chargerCarte(topPage, map){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([topPage.data.lat ?? 0, topPage.data.lng ?? 0]).addTo(map)
        .bindPopup(topPage.data.title).openPopup();
}

async function chargerPistes(page, map){
    const couleurs = ['white', 'blue', 'green', 'red', 'black'];
    const data = await fetch(`https://workshop.neotechweb.net/ws/skimap/1.0.0/pistes.php?station=${page.data.id}`)
    const json = await data.json();
    json.forEach(elt => {
        L.polyline(elt.piste, { color: couleurs[elt.niveau] }).addTo(map);
    });
}