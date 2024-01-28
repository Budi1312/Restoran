/// <reference path="Restoran.ts" />
let stavkeJelovnikaInit: any;
let porudzbineInit: any;

let otvorenaPorudzbina: Porudzbina = null;
let aktivanRestoran = new Restoran("Kod Raspevanog Italijana");




function otvoriPorudzbinu(forma: HTMLFormElement): boolean {

    const ime = (forma.ime as HTMLInputElement).value;
    const datum = new Date();
    const porudzbina = aktivanRestoran.napraviPorudzbinu(ime, datum);
    otvorenaPorudzbina = porudzbina;

    (document.getElementById("idp") as HTMLInputElement).value = otvorenaPorudzbina.id.toString();
    (document.getElementById("imep") as HTMLInputElement).value = otvorenaPorudzbina.imeKlijenta;
    (document.getElementById("datump") as HTMLInputElement).value = otvorenaPorudzbina.datum.toLocaleString();
    document.getElementById("otvorenaporudzbinadiv").hidden = false;
    aktivanRestoran.refreshJelovnik();
    document.getElementById("jelovnikdiv").hidden = false;
    document.getElementById("ispis").innerHTML = "";
    (document.getElementById("otvoribtn") as HTMLButtonElement).disabled = true;

    return false;
}


function clickedMenu(id: number): void {
    const sJ = aktivanRestoran.getStavkaJelovnikaById(id);
    let sP: StavkaPorudzbine = null;

    const porudzbina = otvorenaPorudzbina.stavke.find(p => p.stavkaJelovnika.id == sJ.id);
    if (porudzbina) {
        sP = porudzbina;
    }

    if (sP == null) {
        sP = new StavkaPorudzbine(sJ, 0);
        otvorenaPorudzbina.stavke.push(sP);
    }

    sP.kolicina += 1;
    document.getElementById("spanJelovnik" + sJ.id).innerHTML = sP.kolicina.toString();
}

function skracenica(): void {
    document.getElementById('otvorenaporudzbinadiv').hidden = true;
    document.getElementById('jelovnikdiv').hidden = true;

    otvorenaPorudzbina.status = 'Zatvorena';
    (document.getElementById('otvoribtn') as HTMLButtonElement).disabled = false;
}


function zatvoriPorudzbinu(): void {
    skracenica();
    const p = document.getElementById('ispis');
    p.innerHTML = `
    Porudzbina broj: ${otvorenaPorudzbina.id}
    // 			Klijent: ${otvorenaPorudzbina.imeKlijenta}
    // 			Datum: ${otvorenaPorudzbina.datum}
    //          Status: ${otvorenaPorudzbina.status}
    // 			Naručeno:
    // 			 ${otvorenaPorudzbina.stavke}
    // 		
    // 			
    
    // 			Ukupna za naplatu: 2720
    `;
    otvorenaPorudzbina = null;
}

function otkaziPorudzbinu(): void {
    otvorenaPorudzbina.status = 'Otkazana';
    skracenica();
}

// Implementirati funkciju otkaziPorudzbinu.
// 		-	nema parametre
// 		-	nema povratnu vrednost

// 		Menja status promenljive otkaziPorudzbinu na "Otkazana"
// 		Krije, omogucava, i resetuje vrednost pormenljive kao i metoda zatvoriPorudzbinu.
// 		Tj. radi isto kao i metoda zatvoriPorudzbinu osim ispisa racuna.

























window.onload = function () {
    ucitajPodatke();
    aktivanRestoran.refreshJelovnik();
}


function ucitajPodatke() {
    for (let i = 0; i < stavkeJelovnikaInit.length; i++) {
        let st = new StavkaJelovnika(stavkeJelovnikaInit[i].naziv, stavkeJelovnikaInit[i].cena, stavkeJelovnikaInit[i].tip);
        aktivanRestoran.dodajStavkuJelovnika(st);
    }

    for (let i = 0; i < porudzbineInit.length; i++) {
        let p = new Porudzbina(porudzbineInit[i].imeKlijenta, new Date(porudzbineInit[i].datum), porudzbineInit[i].status);
        for (let stavka of porudzbineInit[i].stavke) {
            let st = aktivanRestoran.getStavkaJelovnikaById(stavka.idstavke);
            let kolicina: number = stavka.kolicina;
            let stpor = new StavkaPorudzbine(st, kolicina);
            p.stavke.push(stpor);
        }
        aktivanRestoran.porudzbine.push(p);
    }
}




