let list = [
    {nom:'Auvergne-Rhône-Alpes', code: 'FR-ARA', taux: 21},
    {nom:'Bourgogne-Franche-Comté', code: 'FR-BFC', taux: 31},
    {nom:'Bretagne', code: 'FR-BRE', taux: 33},
    {nom:'Corse', code: 'FR-COR', taux: 12},
    {nom:'Centre-Val de Loire', code: 'FR-CVL', taux: 18},
    {nom:'Grand Est', code: 'FR-GES', taux: 22},
    {nom:'Hauts-de-France', code: 'FR-HDF', taux: 38},
    {nom:'Île-de-France', code: 'FR-IDF', taux: 34},
    {nom:'Normandie', code: 'FR-NOR', taux: 4},
    {nom:'Nouvelle-Aquitaine', code: 'FR-NAQ', taux: 17},
    {nom:'Occitanie', code: 'FR-OCC', taux: 28},
    {nom:'Pays de la Loire', code: 'FR-PDL', taux: 30},
    {nom:'Provence-Alpes-Côte dAzur', code: 'FR-PAC', taux: 9}
];


const couleurs = [
    {couleur:"#ffffe5", mini:0, maxi:5 },
    {couleur:"#f7fcb9", mini:5, maxi:10 },
    {couleur:"#d9f0a3", mini:10, maxi:15 },
    {couleur:"#addd8e", mini:15, maxi:19 },
    {couleur:"#78c679", mini:19, maxi:23 },
    {couleur:"#41ab5d", mini:23, maxi:27 },
    {couleur:"#238443", mini:27, maxi:31 },
    {couleur:"#006837", mini:31, maxi:35 },
    {couleur:"#004529", mini:35, maxi:40 }
]

function color() {
    for(region of list) {
        const ligne = couleurs.find(c => c.maxi > region.taux);
        document.getElementById(region.code).style.fill = ligne.couleur;
    }
}
let tableau = [
    {code: 11, nom:	"Île-de-France", BTS:44049, DUT:17093, MES:28830, Ingenieur:42347},
    {code: 24, nom:	"Centre-Val de Loire", BTS:8324, DUT:4511, MES:5171, Ingenieur:3071},
    {code: 27, nom:	"Bourgogne-Franche-Comté", BTS:10102, DUT:5012, MES:5180, Ingenieur:4899},
    {code: 28, nom:	"Normandie", BTS:11885, DUT:7011, MES:6471, Ingenieur:6497},
    {code: 32, nom:	"Hauts-de-France", BTS:26320, DUT:10611, MES:14485, Ingenieur:16115},
    {code: 44, nom:	"Grand Est", BTS:21352, DUT:12778, MES:12215, Ingenieur:14102},
    {code: 52, nom:	"Pays de la Loire", BTS:16704, DUT:5716, MES:5780, Ingenieur:10292},
    {code: 53, nom:	"Bretagne", BTS:15467, DUT: 6653, MES:5835, Ingenieur:8853},
    {code: 75, nom:	"Nouvelle-Aquitaine", BTS:21606, MES:10082, DUT:11289, Ingenieur:8718},
    {code: 76, nom:	"Occitanie", BTS:24394, DUT:10578, MES:9980, Ingenieur:14641},
    {code: 84, nom:	"Auvergne-Rhône-Alpes", BTS:28795, DUT:17320, MES:14938, Ingenieur:23272},
    {code: 93, nom:	"Provence-Alpes-Côte d'Azur", BTS:17893,DUT:7780, MES:10871, Ingenieur:5774}
]

const couleurs2 = [
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
function remplir() {
    let contenu = "";
    for(region of tableau) {
        contenu += `<tr>
            <td>${region.code}</td><td>${region.nom}</td>
            <td>${region.BTS}</td>
            <td>${region.DUT}</td>
            <td>${region.MES}</td>
            <td>${region.Ingenieur}</td>
        </tr>
        `
    }
    document.getElementById("databody").innerHTML = contenu;
}
remplir();

//Tier et afficher le tableau par rapport à l'effectif en DUT
function tri() {
    tableau.sort((el1,el2)=> el1.DUT - el2.DUT);
    remplir();
}

//Afficher les régions qui ont moins d'étudiants en école d'ingénieur qu'en DUT
function ingenieur_dut () {
    for(lign of tableau) {
        const ligne = tableau.find(t => t.DUT > t.Ingenieur);
        for(lign2 of list) {
            lign2.nom
        }
        ligne.nom
        list.nom
        list.code
        document.getElementById(region.code).style.fill = ligne.couleur;
    }
}