const fonctions = [
    {code:"q1", fonction: function() {
        //[...document.getElementsByTagName("rect")].forEach(elt => elt.classList.add("occupe"));
        document.querySelectorAll("rect").forEach(elt => elt.classList.add("occupe")); //<-- Marche pour tous les selecteurs
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
     //='vis' que classe vis ~='vis' dont la classe vis *='vis' contient les lettres vis
     {code:"q8", fonction: function() { //vis et d'autres classe avec pas que la classe vis
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
        [...document.querySelectorAll(".stock[data-quantite]")].filter(elt => elt.dataset.quantite > 30).forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q23", fonction: function() {
      [...document.querySelectorAll(".stock[data-inventaire]")].filter(elt => new Date(elt.dataset.inventaire) > new Date(2020, 7, 12)).forEach(elt => elt.classList.add("occupe"));
     } },
     {code:"q24", fonction: function() {
        var groupeVide = document.querySelector(".IlotC g:empty");
        var elementsMoulage = document.querySelectorAll(".IlotC .moulage");
        elementsMoulage.forEach(elt => groupeVide.appendChild(elt));
     } },
     //ajouter un cercle dans le groupe vide
     {code:"q25", fonction: function() {
      var groupeVide = document.querySelector(".IlotC g:empty");
      //cr??er un element SVG : createElementNS
      var cercle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      cercle.setAttribute("r", "15");
      cercle.setAttribute("cx", "7.5");
      cercle.setAttribute("cy", "7.5");
      cercle.setAttribute("fill", "purple");

      groupeVide.appendChild(cercle);
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
 * ?? tous les ??l??ments de type rect. 2 m??thodes sont possibles OK
 * ?? l?????l??ment machine41664. 2 m??thodes sont possibles OK
 * ?? l?????l??ment machine41664 et ?? l?????l??ment machine20125. 1 seule m??thode est possible. OK
 * ?? tous les ??l??ments contenant la classe indisponible. 2 m??thodes sont possibles OK
 * ?? tous les ??l??ments contenant l???attribut data-inventaire. OK
 * ?? tous les ??l??ments rect de largeur 35. OK
 * ?? tous les ??l??ments de classe machine et de fabricant Billon. OK
 * ?? tous les ??l??ments de class stock qui contiennent des vis. OK
 * ?? tous les ??l??ments de class stock qui contiennent des articles contenant les lettres vis. OK
 * ?? tous les ??l??ments dont la date d???inventaire commence par 2019. OK
 * ?? tous les ??l??ments moulage dans la zoneB. OK
 * ?? tous les ??l??ments moulage indisponible dans la zoneC. OK
 * ?? tous les ??l??ments stock qui n???ont pas de date d???inventaire. OK
 * le premier ??l??ment de la zoneA. OK
 * le dernier ??l??ment de la zoneB. OK
 * les ??l??ments enfants de l???IlotC. OK
 * les ??l??ments imm??diatement enfants de l???IlotC. OK
 * les ??l??ments stock qui suivent un ??l??ment machine injection. OK
 * les ??l??ments machine moulage dans le m??me ilot qu???une machine injection indisponible. OK
 * la seule machine de son groupe. OK
 * les machines de l???Ilot A qui ne sont pas indisponible OK
 * Les stocks avec une quantit?? sup??rieur ?? 30 OK
 * Les stocks avec date d???inventaire sup??rieure ?? 12 ao??t 2020 
 * le groupe vide dans l???IotC et d??placer les machines de moulage de l???IlotC ?? l???int??rieur
 */