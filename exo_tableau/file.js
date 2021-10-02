let tableau = [
    {code: "FR-IDF", nom:"Île-de-France", BTS:44049, DUT:17093, MES:28830, Ingenieur:42347, TotalEtu: 0},
    {code: "FR-CVL", nom:"Centre-Val de Loire", BTS:8324, DUT:4511, MES:5171, Ingenieur:3071, TotalEtu: 0},
    {code: "FR-BFC", nom:"Bourgogne-Franche-Comté", BTS:10102, DUT:5012, MES:5180, Ingenieur:4899, TotalEtu: 0},
    {code: "FR-NOR", nom:"Normandie", BTS:11885, DUT:7011, MES:6471, Ingenieur:6497, TotalEtu: 0},
    {code: "FR-HDF", nom:"Hauts-de-France", BTS:26320, DUT:10611, MES:14485, Ingenieur:16115, TotalEtu: 0},
    {code: "FR-GES", nom:"Grand Est", BTS:21352, DUT:12778, MES:12215, Ingenieur:14102, TotalEtu: 0},
    {code: "FR-PDL", nom:"Pays de la Loire", BTS:16704, DUT:5716, MES:5780, Ingenieur:10292, TotalEtu: 0},
    {code: "FR-BRE", nom:"Bretagne", BTS:15467, DUT: 6653, MES:5835, Ingenieur:8853, TotalEtu: 0},
    {code: "FR-NAQ", nom:"Nouvelle-Aquitaine", BTS:21606, MES:10082, DUT:11289, Ingenieur:8718, TotalEtu: 0},
    {code: "FR-OCC", nom:"Occitanie", BTS:24394, DUT:10578, MES:9980, Ingenieur:14641, TotalEtu: 0},
    {code: "FR-ARA", nom:"Auvergne-Rhône-Alpes", BTS:28795, DUT:17320, MES:14938, Ingenieur:23272, TotalEtu: 0},
    {code: "FR-PAC", nom:"Provence-Alpes-Côte d'Azur", BTS:17893,DUT:7780, MES:10871, Ingenieur:5774, TotalEtu: 0}
]

const palette = [
    {codec:"#8e0152", min:3000, max:5000},
    {codec:"#c51b7d", min:5000, max:6000},
    {codec:"#de77ae", min:6000, max:10000},
    {codec:"#f1b6da", min:10000, max:12000}, 
    {codec:"#fde0ef", min:12000, max:14000}, 
    {codec:"#e6f5d0", min:14000, max:16000}, 
    {codec:"#b8e186", min:16000, max:18000}, 
    {codec:"#7fbc41", min:18000, max:24000}, 
    {codec:"#4d9221", min:24000, max:30000}, 
    {codec:"#276419", min:30000, max:45000}
]

//remplir le tableau avec ses valeurs
function remplir(tab) {
    let contenu = "";
    for(region of tab) {
        contenu +=
        `<tr>
            <td>${region.code}</td>
            <td>${region.nom}</td>
            <td>${region.BTS}</td>
            <td>${region.DUT}</td>
            <td>${region.MES}</td>
            <td>${region.Ingenieur}</td>
            <td>${region.TotalEtu}</td>
        </tr>`
    }// ?? sur ${region.TotalEtu} test si une valeur existe pour la colonne
    return document.getElementById("databody").innerHTML = contenu;
}
remplir(tableau);

//Tier et afficher le tableau par rapport à l'effectif en DUT
function tri() {
    const tab = tableau.sort((el1,el2)=> el1.DUT - el2.DUT);
    return tab;
}

//Afficher les régions qui ont moins d'étudiants en école d'ingénieur qu'en DUT
function ingenieur_dut() {
    const tab = tableau.filter(elt => elt.Ingenieur < elt.DUT);
    for(line of tab){
        document.getElementById(line.code).style.fill = "red";
    }
    return tab;
}

//Sélectionner les 3 régions qui comptes le plus d'étudiants en MES 
//Combiner les fonctions de tri et de sélection pour arriver au résultat
function regions_mes() {
    const tab = tableau.sort((elt1, elt2) => elt2.MES - elt1.MES).slice(0,3);
    for(line of tab){
        document.getElementById(line.code).style.fill = "yellow";
    }
    return tab;
}

//Existe-t-il au moins une région qui compte moins de 5 000 étudiants en école d'ingénieur ?
function etu_inge() {
    const rep = tableau.some(region => region.Ingenieur < 5000);
    const lines = tableau.filter(region => region.Ingenieur < 5000);
    if (rep) {
        for(line of lines){
            document.getElementById(line.code).style.fill = "purple";
        }
        return "Il y a au moins une région concernée";
    } else {
        return "Acune région n'est concernée";
    }
}

//Est-ce que toutes les régions ont bien au moins 5 000 étudiants inscrits en DUT ?
function etu_dut(){
    const rep = tableau.every(region => region.DUT > 5000);
    const lines = tableau.filter(region => region.DUT > 5000);
    for(line of lines){
        document.getElementById(line.code).style.fill = "pink";
    }
    if (rep) {
        return "Toutes les régions ont bien au moins 5 000 étudiants inscrits en DUT";
    } else {
        return "Toutes les regions ne sont pas concernées";
    }
}

//Ajouter une colonne aux données qui calcule le nombre d'étudiants total dans chaque région.
function add_column(){
    tableau.map(column => column.TotalEtu = column.DUT + column.Ingenieur + column.MES + column.BTS);
   /**
    *  for(i in ligneSomme) {
    *    tableau[i].TotalEtu = ligneSomme[i];
    *   }
    *  */
    return tableau;
}

//Calculer le nombre total d'étudiants
function total_etu() {
    const ligneSomme = tableau.map(column => column.TotalEtu = column.DUT + column.Ingenieur + column.MES + column.BTS);
    const tabSomme = ligneSomme.reduce((prevValue, curValue) => prevValue + curValue);
    return tabSomme;
}

//Sélectionner la région qui possède le plus d'étudiant en BTS.
//Utiliser la fonction reduce pour effecuer la sélection
function max_bts() {
     const max = tableau.reduce((acc, region) => {
         //début avec acc null, pas 0 au cas ou on ait des valeurs negatives dans le tableau par ex.
         //pour chaque ligne on teste si par région le nb est supperieur à l'acc
        if (acc === null || region.BTS > acc) {
            return region.BTS; //Quand valeur lue > acc
        }
        return acc; // Quand acc > valeur lue
      }, null);

    const entree = tableau.filter(elt => elt.BTS == max);
    document.getElementById(entree[0].code).style.fill = "green";
    //console.log(entree[0].nom);
    return entree;
}
//tableau.reduce((acc, regions) => acc = region.BTS > acc.BTS ? region : acc); <<-- correction

//Calculer le nombre total d'étudiants en comptabilisant uniquement les régions qui possède plus de 6000
// étudiants en MES.
function total_mes_6000() {
    const somme = tableau.filter(elt => elt.MES > 6000).map(item => item.DUT + item.Ingenieur + item.MES + item.BTS).reduce((acc, next) => acc + next);
    return somme + " Etudiants dans les régions >6000 MES";
}

//liste des fonctions
const fonctions = [
    {code:"tri", fonction: tri},
    {code:"inge_dut", fonction: ingenieur_dut},
    {code:"regions_mes", fonction: regions_mes},
    {code:"etu_inge", fonction: etu_inge},
    {code:"etu_dut", fonction: etu_dut},
    {code:"add_column", fonction: add_column},
    {code:"total_etu", fonction: total_etu},
    {code:"max_bts", fonction: max_bts},
    {code:"total_mes_6000", fonction: total_mes_6000}
]

//balise select html
function appliquer() {
    let valueselected = document.getElementById("question").value;
    let func = fonctions.find(f => f.code == valueselected);
    let t = func.fonction();
    if (Array.isArray(t)) {
        remplir(t);
    } else {
        document.getElementById("resultat").innerHTML = t;
    }
}


/**
 * La méthode reduce() applique une fonction qui est un « accumulateur » 
 * et qui traite chaque valeur d'une liste (de la gauche vers la droite) 
 * afin de la réduire à une seule valeur.
 * 
 * La méthode map() crée un nouveau tableau avec les résultats de l'appel
 * d'une fonction fournie sur chaque élément du tableau appelant.
 * 
 * La méthode filter() crée et retourne un nouveau tableau contenant
 * tous les éléments du tableau d'origine qui remplissent une condition 
 * déterminée par la fonction callback.
 */