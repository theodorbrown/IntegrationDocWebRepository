let list = [
    ['Auvergne-Rhône-Alpes', 'FR-ARA', 21],
    ['Bourgogne-Franche-Comté','FR-BFC', 31],
    ['Bretagne','FR-BRE', 33],
    ['Corse','FR-COR', 12],
    ['Centre-Val de Loire','FR-CVL',18],
    ['Grand Est', 'FR-GES', 22],
    ['Hauts-de-France', 'FR-HDF', 38],
    ['Île-de-France', 'FR-IDF', 34],
    ['Normandie', 'FR-NOR', 4],
    ['Nouvelle-Aquitaine', 'FR-NAQ', 17],
    ['Occitanie', 'FR-OCC', 28],
    ['Pays de la Loire', 'FR-PDL', 30],
    ['Provence-Alpes-Côte dAzur', 'FR-PAC', 9]
];


function color() {
    list.forEach(function(item){
        var sc = item[2];
        var el = document.getElementById(item[1]);
        switch (true) {
            case (0 < sc && sc <= 5) : 
                el.style.fill = "#ffffe5";
                break;
            case (5 < sc && sc <= 10):
                el.style.fill = "#f7fcb9";
                break;
            case (10 < sc && sc <= 15):
                el.style.fill = "#d9f0a3";
                break; 
            case (15 < sc && sc <= 19):
                el.style.fill = "#addd8e";
                break;
            case (19 < sc && sc <= 23):
                el.style.fill = "#78c679";
                break;
            case (23 < sc && sc <= 27):
                el.style.fill = "#41ab5d";
                break;        
            case (27 < sc && sc <= 31):
                el.style.fill = "#238443";
                break;
            case (31 < sc && sc <= 35):
                el.style.fill = "#006837";
                break;
            case (35 < sc && sc <= 40):
                el.style.fill = "#004529";
                break;
        }
    });
}