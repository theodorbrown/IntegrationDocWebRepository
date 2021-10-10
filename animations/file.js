//transform origine pour que la rotation 90 soit fonctionnelle
let transforms = [
    '541 364',
    '541 965',
    '541 1552',
]
//select les 3 use des robinets
let robinets = document.querySelectorAll(".rob");
//selecteur de transformations
let i = 0
//états des robinets
let opened1 = false;
let opened2 = false;
let opened3 = false;

let done = false


robinets.forEach((e) => {
    e.setAttribute('transform-origin', transforms[i]);
    e.addEventListener("click", () => {
        action(e);   
    });
    i+=1
});

function action(e) {
    if(e.getAttribute("id") == "rob1"){
        if (!opened1){
            e.style.transform = "rotate(90deg)";
            accumulateur(cuve1, "cer_rouge", "rect_rouge");
            opened1 = true;

        } else {
            e.style.transform = "rotate(180deg)";
            opened1 = false;
            //make it stop
        }
    }
    if(e.getAttribute("id") == "rob2"){
        if (!opened2){
            e.style.transform = "rotate(90deg)";
            accumulateur(cuve2, "cer_vert", "rect_vert");
        } else {
            e.style.transform = "rotate(180deg)";
            opened2 = false;
            console.log("2 else");
        }
    }
    if(e.getAttribute("id") == "rob3"){
        if (!opened3){
            e.style.transform = "rotate(90deg)";
            accumulateur(cuve3, "cer_bleu", "rect_bleu");
        } else {
            e.style.transform = "rotate(180deg)";
            opened3 = false;
            console.log("3 else");
        }
    }
}


async function accumulateur(cuveN, objId, objId2) {
    let declencheur = false;
    //cercle (objId)
    if(cuveN.cyC.from < cuveN.cyC.to) {
        cuveN.cyC.from+= 0.5;
        document.getElementById(objId).setAttribute("cy",cuveN.cyC.from);
        declencheur = true
    }
    //height rect (objId2)
    if(cuveN.heightR.from > cuveN.heightR.to) {
        cuveN.heightR.from-=0.5;
        document.getElementById(objId2).setAttribute("height",cuveN.heightR.from);
        declencheur = true
    }
    //y rect (objId2)
    if(cuveN.yR.from < cuveN.yR.to) {
        cuveN.yR.from+=0.5;
        document.getElementById(objId2).setAttribute("y",cuveN.yR.from);
        declencheur = true
    }

    if(declencheur) {
        await sleep(30);
        accumulateur(cuveN, objId, objId2);
        declencheur = false
    }
}

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

cuve1 = {
    cyC: {
        from: 280,
        to: 450
    },
    heightR: {
        from: 150,
        to: 0
    },
    yR: {
        from: 290,
        to: 450
    }
}

cuve2 = {
    cyC: {
        from: 680,
        to: 1020
    },
    heightR: {
        from: 350,
        to: 0
    },
    yR: {
        from: 680,
        to: 1020
    }
}

cuve3 = {
    cyC: {
        from: 1420,
        to: 1640
    },
    heightR: {
        from: 210,
        to: 0
    },
    yR: {
        from: 1420,
        to: 1640
    }
}