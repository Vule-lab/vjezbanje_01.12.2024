const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Privremena baza podataka
let itOprema = [
    {
        "id": 1,
        "naziv": "Laptop",
        "serijski_broj": "ABC12345",
        "god_proizvodnje": "2020",
        "dobavljac": "Dell"
    },
    {
        "id": 2,
        "naziv": "Monitor",
        "serijski_broj": "XYZ67890",
        "god_proizvodnje": "2022",
        "dobavljac": "LG"
    }
];




// READ -> GET API
app.get('/getOprema', (request, response) => {
    return response.send('Popis IT opreme: ' + JSON.stringify(itOprema));
});


app.get('/getOprema/:id', (request, response) => {
    let id = request.params.id;
    let oprema = "";
    itOprema.forEach(element => {
        if (element.id == id) {
            oprema = JSON.stringify(element);
        }
    });
    return response.send('Dohvat IT opreme: ' + oprema);
});


// CREATE -> POST API
app.post('/addOprema', (request, response) => {
    const data = request.body;
    const naziv = data.naziv;
    const serijski_broj = data.serijski_broj;
    const god_proizvodnje = data.god_proizvodnje;
    const dobavljac = data.dobavljac;

    let novaOprema = {
        "id": itOprema.length + 1,
        "naziv": naziv,
        "serijski_broj": serijski_broj,
        "god_proizvodnje": god_proizvodnje,
        "dobavljac": dobavljac
    };

    itOprema.push(novaOprema);

    return response.send("Dodavanje IT opreme. Novi popis: " + JSON.stringify(itOprema));
});




// UPDATE -> PUT API
app.put('/updateOprema/:id', (request, response) => {
    let id = request.params.id;
    const data = request.body;
    const naziv = data.naziv;
    const serijski_broj = data.serijski_broj;
    const god_proizvodnje = data.god_proizvodnje;
    const dobavljac = data.dobavljac;

    itOprema.forEach(element => {
        if (element.id == id) {
            element.naziv = naziv || element.naziv;
            element.serijski_broj = serijski_broj || element.serijski_broj;
            element.god_proizvodnje = god_proizvodnje || element.god_proizvodnje;
            element.dobavljac = dobavljac || element.dobavljac;
        }
    });

    return response.send("Ažuriranje IT opreme s ID-jem " + id + ". Novi popis: " + JSON.stringify(itOprema));
});




// DELETE -> DELETE API
app.delete('/deleteOprema/:id', (request, response) => {
    let id = request.params.id;

    itOprema = itOprema.filter(element => element.id != id);

    return response.send("Brisanje IT opreme s ID-jem " + id + ". Novi popis: " + JSON.stringify(itOprema));
});

// Pokretanje servera
app.listen(3000, () => {
    console.log("Server running on port 3000");
});