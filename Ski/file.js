document.addEventListener('init', function(event) {
    //ons-page (event.target)
    var page = event.target;
    const navigator = document.getElementById("myNavigator");
  
    if (page.id === 'page1') {
         ChargerMassifs(page);
    }
    else if (page.id === 'page2') {
        ChargerStations(page);
        page.querySelector('ons-toolbar .center').innerHTML += " " + page.data.title;
    }
    else if (page.id === 'page3') {
        page.querySelector('ons-toolbar .center').innerHTML += " " + page.data.title;
    }
    else if (page.id === 'tab1') {
        console.log(navigator.topPage.data.title);
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
          id: event.currentTarget.dataset.id
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

        const items = clone.querySelectorAll("span.contenu");
        items[0].textContent = elt.nom;
        items[1].textContent = `${elt.pistes} pistes`;
        items[2].textContent = `${elt.altitude_maxi ?? `-`} alt max`;
        items[3].textContent = `${elt.altitude_mini ?? `-`} alt mini`;

        list.appendChild(clone);
    });
}