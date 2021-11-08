var slider = document.getElementById("myRange");
slider.addEventListener('change', doThat);


function doThat(){
    let value = slider.value;
    value = value*10
    let string = `rotate(` +value+`)`;
    document.getElementById("AM").setAttribute("transform", string);
}

var slider2 = document.getElementById("myRange2");
slider2.addEventListener('change', doThat2);


function doThat2(){
    let value = slider2.value;
    value = value*100
    let string = `rotate(` +value+`)`;
    document.getElementById("AH").setAttribute("transform", string);
}