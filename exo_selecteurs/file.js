const fonctions = [
    {code:"q1", fonction: function() {
        [...document.getElementsByTagName("rect")].forEach(elt => elt.classList.add("occupe"));
        //document.querySelectorAll(".rect").forEach(elt => elt.classList.add("occupe")); <-- Marche pour tous les selecteurs
     } },
     {code:"q2", fonction: function() { 
         document.querySelector("#machine41664").classList.add("occupe"); // <-- Renvoi une seule ligne pas de liste/tableau
         //document.getElementById("machine41664").classList.add("occupe");
     } },
     {code:"q3", fonction: function() { 
        document.querySelectorAll("#machine41664, #machine20125").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q4", fonction: function() { 
        //[...document.getElementsByClassName("indisponible")].forEach(elt => elt.classList.add("occupe"));
        document.querySelectorAll(".indisponible").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q5", fonction: function() { 
        document.querySelectorAll("[data-inventaire]").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q6", fonction: function() { 
        document.querySelectorAll("rect[width='35']").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q7", fonction: function() { 
        document.querySelectorAll(".machine[data-fabricant='Billon']").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q8", fonction: function() { 
        document.querySelectorAll(".stock[data-articles~='vis']").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q9", fonction: function() { 
        document.querySelectorAll(".stock[data-articles*='vis']").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q10", fonction: function() { 
        document.querySelectorAll("[data-inventaire^='2019']").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q11", fonction: function() { 
        document.querySelectorAll(".ZoneB .moulage").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q12", fonction: function() { 
        document.querySelectorAll(".ZoneC .moulage.indisponible").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q13", fonction: function() { 
        document.querySelectorAll(".stock:not([data-inventaire])").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q14", fonction: function() { 
        document.querySelectorAll(".ZoneA :first-child").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q15", fonction: function() { 
        document.querySelectorAll(".ZoneB :last-child").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q16", fonction: function() { 
        document.querySelectorAll(".IlotC *").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q17", fonction: function() { 
        document.querySelectorAll(".IlotC>polygon").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q18", fonction: function() { 
        document.querySelectorAll(".machine.injection+.stock").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q19", fonction: function() {
        document.querySelectorAll(".machine.injection.indisponible").forEach(elt => elt.parentElement.querySelectorAll(".machine.moulage").forEach(elt => elt.classList.add("occupe")));
     } },
     {code:"q20", fonction: function() {
        document.querySelectorAll(".machine:only-child").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q21", fonction: function() {
        document.querySelectorAll(".IlotA .machine:not(.indisponible)").forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q22", fonction: function() {                        //data-quantite='30'
        [...document.querySelectorAll(".stock")].filter(elt => elt.dataset.quantite > 30).forEach(elt => elt.classList.add("occupe"));
     } },

]

//balise select html
function appliquer() {
    let valueselected = document.getElementById("question").value;
    let func = fonctions.find(f => f.code == valueselected);
                                                                        //value
    document.querySelectorAll(".occupe").forEach(elt => elt.classList.remove("occupe")); // vide les couleurs

    let t = func.fonction();
    if (Array.isArray(t)) {
        remplir(t);
    } else {
        document.getElementById("resultat").innerHTML = t;
    }
}

/**
 * à tous les éléments de type rect. 2 méthodes sont possibles OK
 * à l’élément machine41664. 2 méthodes sont possibles OK
 * à l’élément machine41664 et à l’élément machine20125. 1 seule méthode est possible. OK
 * à tous les éléments contenant la classe indisponible. 2 méthodes sont possibles OK
 * à tous les éléments contenant l’attribut data-inventaire. OK
 * à tous les éléments rect de largeur 35. OK
 * à tous les éléments de classe machine et de fabricant Billon. OK
 * à tous les éléments de class stock qui contiennent des vis. OK
 * à tous les éléments de class stock qui contiennent des articles contenant les lettres vis. OK
 * à tous les éléments dont la date d’inventaire commence par 2019. OK
 * à tous les éléments moulage dans la zoneB. OK
 * à tous les éléments moulage indisponible dans la zoneC. OK
 * à tous les éléments stock qui n’ont pas de date d’inventaire. OK
 * le premier élément de la zoneA. OK
 * le dernier élément de la zoneB. OK
 * les éléments enfants de l’IlotC. OK
 * les éléments immédiatement enfants de l’IlotC. OK
 * les éléments stock qui suivent un élément machine injection. OK
 * les éléments machine moulage dans le même ilot qu’une machine injection indisponible. OK
 * la seule machine de son groupe. OK
 * les machines de l’Ilot A qui ne sont pas indisponible OK
 * Les stocks avec une quantité supérieur à 30 OK
 * Les stocks avec date d’inventaire supérieure à 12 août 2020 OK
 * le groupe vide dans l’IotC et déplacer les machines de moulage de l’IlotC à l’intérieur
 */