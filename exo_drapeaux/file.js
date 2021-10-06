function checkImage(path){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({path, status: "ok"});
    img.onerror = () => reject({path, status: "errror"});
    img.src = path;
  })
}

function charger() {
  document.getElementById("drapeau").innerHTML = "";
  var code_pays = document.getElementById("question").value;
  checkImage(`https://workshop.neotechweb.net/ws/flags/64/${code_pays}.png`)
    .then((response) => {
    let image = document.createElement("img");
    image.src = response.path;
    document.getElementById("drapeau").appendChild(image)
    })
    .catch(() => {
      document.getElementById("drapeau").innerHTML = "Erreur code drapeau";
    });
  }

  async function charger2() {
    document.getElementById("drapeau").innerHTML = "";
    var code_pays = document.getElementById("question").value;

    try {
      response = await checkImage(`https://workshop.neotechweb.net/ws/flags/64/${code_pays}.png`)
      let image = document.createElement("img");
      image.src = response.path;
      document.getElementById("drapeau").appendChild(image)
    }
    catch {
      document.getElementById("drapeau").innerHTML = "Erreur code drapeau";
    }
  }

  function nombrePaire(nombre) {
    return new Promise((resolve, reject) => {
      if (nombre%2 == 0) resolve(); else reject();
    });
  }

  function multipleDix() {
    return new Promise((resolve, reject) => {
      if (nombre%10 == 0) resolve(); else reject();
    });
  }

  function verifier() {
    document.getElementById("res_nb").innerHTML = "";
    let entree = document.getElementById("entree").value;

    nombrePaire(entree)
      .then(() => document.getElementById("res_nb").innerHTML = "Vrai")
      .catch(() => document.getElementById("res_nb").innerHTML = "Faux");
  }

  async function verifier2() {
    document.getElementById("res_nb").innerHTML = "";
    let entree = document.getElementById("entree").value;
    try {
      resultat = await nombrePaire(entree)
      document.getElementById("res_nb").innerHTML = "Vrai"
    }
    catch {
      document.getElementById("res_nb").innerHTML = "Faux"
    }
  }

  /**
   * Si une promesse est juste : then, si toutes fausses : catch
   * Promise.any([])
   *  .then(() => )
   *  .catch(() => )
   */

    /**
   * Si toutes les prommesses sont justes : then sinon catch
   * Promise.all([])
   *  .then(() => )
   *  .catch(() => )
   */


async function displayStations() {
  let data = await fetch("https://workshop.neotechweb.net/ws/skimap/1.0.0/stations.php?massif=2");
  let datajson = await data.json();
  //console.log(datajson)
  datajson.forEach(elt => {
    let ligne = document.getElementById("ligne");//le template
    let clone = document.importNode(ligne.content, true);
    let colonnes = clone.querySelectorAll("td");
    colonnes[0].innerText = elt.nom;
    colonnes[1].innerText = elt.lat;
    colonnes[2].innerText = elt.lng;
    document.querySelector("tbody").appendChild(clone);
  });
}

displayStations()

/**
 *  L'élément HTML <template> (ou Template Content ou modèle de contenu) est un mécanisme
 *  utilisé pour stocker du contenu HTML (côté client) qui ne doit pas être affiché lors
 *  du chargement de la page mais qui peut être instancié et affiché par la suite grâce
 *  à un script JavaScript.
 */