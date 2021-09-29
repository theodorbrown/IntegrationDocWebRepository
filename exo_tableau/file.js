let tableau = [
    {code: "FR-IDF", nom:"Île-de-France", BTS:44049, DUT:17093, MES:28830, Ingenieur:42347},
    {code: "FR-CVL", nom:"Centre-Val de Loire", BTS:8324, DUT:4511, MES:5171, Ingenieur:3071},
    {code: "FR-BFC", nom:"Bourgogne-Franche-Comté", BTS:10102, DUT:5012, MES:5180, Ingenieur:4899},
    {code: "FR-NOR", nom:"Normandie", BTS:11885, DUT:7011, MES:6471, Ingenieur:6497},
    {code: "FR-HDF", nom:"Hauts-de-France", BTS:26320, DUT:10611, MES:14485, Ingenieur:16115},
    {code: "FR-GES", nom:"Grand Est", BTS:21352, DUT:12778, MES:12215, Ingenieur:14102},
    {code: "FR-PDL", nom:"Pays de la Loire", BTS:16704, DUT:5716, MES:5780, Ingenieur:10292},
    {code: "FR-BRE", nom:"Bretagne", BTS:15467, DUT: 6653, MES:5835, Ingenieur:8853},
    {code: "FR-NAQ", nom:"Nouvelle-Aquitaine", BTS:21606, MES:10082, DUT:11289, Ingenieur:8718},
    {code: "FR-OCC", nom:"Occitanie", BTS:24394, DUT:10578, MES:9980, Ingenieur:14641},
    {code: "FR-ARA", nom:"Auvergne-Rhône-Alpes", BTS:28795, DUT:17320, MES:14938, Ingenieur:23272},
    {code: "FR-PAC", nom:"Provence-Alpes-Côte d'Azur", BTS:17893,DUT:7780, MES:10871, Ingenieur:5774}
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
        </tr>`
    }
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

//liste des fonctions
const fonctions = [
    {"code":"tri", "fonction": tri},
    {"code":"inge_dut", "fonction": ingenieur_dut},
    {"code":"regions_mes", "fonction": regions_mes},
]

//balise select html
function appliquer() {
    let valueselect = document.getElementById("question").value
    let ligne = fonctions.find(f => f.code == valueselect);
    let t = ligne.fonction();

    if (Array.isArray(t)) {
        remplir(t);
    } else {
        document.getElementById("resultat").innerHTML = t;
    }
    
}