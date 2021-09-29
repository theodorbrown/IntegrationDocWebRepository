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