var map = L.map('macarte').setView([48.03795, 6.97124], 11.4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function getData()
{
  let data = await fetch("https://workshop.neotechweb.net/ws/skimap/1.0.0/stations.php?massif=2");
  let datajson = await data.json();
  let res = datajson.filter(el => !!el.lat && !!el.lng)
  //console.log(datajson)
  res.forEach(element => {
    L.marker([element.lat, element.lng]).addTo(map)
    .bindPopup(element.nom)
    .openPopup();
});

}

getData()