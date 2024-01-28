var StavkaJelovnika = /** @class */ (function () {
    function StavkaJelovnika(naziv, cena, tip) {
        StavkaJelovnika.LAST_ID++;
        this._id = StavkaJelovnika.LAST_ID;
        this._naziv = naziv;
        this._cena = cena;
        this._tip = tip;
    }
    Object.defineProperty(StavkaJelovnika.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StavkaJelovnika.prototype, "naziv", {
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StavkaJelovnika.prototype, "cena", {
        /**
         * Getter cena
         * @return {number}
         */
        get: function () {
            return this._cena;
        },
        /**
         * Setter cena
         * @param {number} value
         */
        set: function (value) {
            this._cena = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StavkaJelovnika.prototype, "tip", {
        /**
         * Getter tip
         * @return {string}
         */
        get: function () {
            return this._tip;
        },
        /**
         * Setter tip
         * @param {string} value
         */
        set: function (value) {
            this._tip = value;
        },
        enumerable: false,
        configurable: true
    });
    StavkaJelovnika.LAST_ID = 0;
    return StavkaJelovnika;
}());
/// <reference path="StavkaJelovnika.ts" />
var StavkaPorudzbine = /** @class */ (function () {
    function StavkaPorudzbine(stavkaJelovnika, kolicina) {
        this._stavkaJelovnika = stavkaJelovnika;
        this._kolicina = kolicina;
    }
    Object.defineProperty(StavkaPorudzbine.prototype, "stavkaJelovnika", {
        /**
         * Getter stavkaJelovnika
         * @return {StavkaJelovnika}
         */
        get: function () {
            return this._stavkaJelovnika;
        },
        /**
         * Setter stavkaJelovnika
         * @param {StavkaJelovnika} value
         */
        set: function (value) {
            this._stavkaJelovnika = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StavkaPorudzbine.prototype, "kolicina", {
        /**
         * Getter kolicina
         * @return {number}
         */
        get: function () {
            return this._kolicina;
        },
        /**
         * Setter kolicina
         * @param {number} value
         */
        set: function (value) {
            this._kolicina = value;
        },
        enumerable: false,
        configurable: true
    });
    return StavkaPorudzbine;
}());
/// <reference path="StavkaPorudzbine.ts" />
var Porudzbina = /** @class */ (function () {
    function Porudzbina(imeKlijenta, datum, status) {
        if (status === void 0) { status = "Otvorena"; }
        Porudzbina.LAST_ID++;
        this._id = Porudzbina.LAST_ID;
        this._stavke = [];
        this._imeKlijenta = imeKlijenta;
        this._datum = datum;
        this.status = status;
        // this._status = status;
    }
    Object.defineProperty(Porudzbina.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Porudzbina.prototype, "imeKlijenta", {
        /**
         * Getter imeKlijenta
         * @return {string}
         */
        get: function () {
            return this._imeKlijenta;
        },
        /**
         * Setter imeKlijenta
         * @param {string} value
         */
        set: function (value) {
            this._imeKlijenta = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Porudzbina.prototype, "datum", {
        /**
         * Getter datum
         * @return {Date}
         */
        get: function () {
            return this._datum;
        },
        /**
         * Setter datum
         * @param {Date} value
         */
        set: function (value) {
            this._datum = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Porudzbina.prototype, "status", {
        /**
         * Getter status
         * @return {string}
         */
        get: function () {
            return this._status;
        },
        /**
         * Setter status
         * @param {string} value
         */
        set: function (value) {
            this._status = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Porudzbina.prototype, "stavke", {
        /**
         * Getter stavke
         * @return {StavkaPorudzbine[]}
         */
        get: function () {
            return this._stavke;
        },
        /**
         * Setter stavke
         * @param {StavkaPorudzbine[]} value
         */
        set: function (value) {
            this._stavke = value;
        },
        enumerable: false,
        configurable: true
    });
    Porudzbina.LAST_ID = 0;
    return Porudzbina;
}());
/// <reference path="StavkaJelovnika.ts" />
/// <reference path="Porudzbina.ts" />
/// <reference path="StavkaPorudzbine.ts" />
var Restoran = /** @class */ (function () {
    function Restoran(naziv) {
        this._naziv = naziv;
        this._jelovnik = [];
        this._porudzbine = [];
    }
    Restoran.prototype.dodajStavkuJelovnika = function (stavkeJelovnika) {
        this._jelovnik.push(stavkeJelovnika);
        this.refreshJelovnik();
    };
    Restoran.prototype.refreshJelovnik = function () {
        var out = '';
        for (var i = 0; i < this._jelovnik.length; i++) {
            var spanJelovnik = this._jelovnik[i];
            out = "\n            <li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-start\" onclick=\"clickedMenu(".concat(spanJelovnik.id, ")\">\n                <div class=\"ms-2 me-auto fw-bold\"> ").concat(spanJelovnik.naziv, " ").concat(spanJelovnik.cena, "</div>\n                <span class=\"badge bg-primary rounded-pill\" id=\"spanJelovnik").concat(spanJelovnik.id, "\"></span>\n            </li>\n            ");
        }
        document.getElementById('listajelovnik').innerHTML = out;
    };
    Restoran.prototype.napraviPorudzbinu = function (imeKlijenta, datum) {
        if (imeKlijenta == null)
            return;
        var porudzbina = new Porudzbina(imeKlijenta, datum);
        this._porudzbine.push(porudzbina);
        return porudzbina;
    };
    Restoran.prototype.getStavkaJelovnikaById = function (id) {
        var jelovnik = this._jelovnik.find((function (j) { return j.id === id; }));
        if (!jelovnik)
            return null;
        return jelovnik;
    };
    Restoran.prototype.zlatniKlijenti = function () {
        var bodovi = 0;
        var brojac = 0;
        for (var i = 0; i < this._porudzbine.length; i++) {
            if (this._porudzbine[i].status == 'Zatvorena') {
                for (var j = 0; j < this._jelovnik.length; i++) {
                    if (this._jelovnik[i].tip == 'Predjelo') {
                        brojac++;
                        bodovi = brojac * 1;
                    }
                    else if (this._jelovnik[i].tip == 'Glavno jelo') {
                        brojac++;
                        bodovi = brojac * 3;
                    }
                    else if (this._jelovnik[i].tip == 'Desert') {
                        brojac++;
                        bodovi = brojac * 1;
                    }
                }
            }
        }
        if (bodovi < Restoran.BODOVI_ZA_GOLD)
            return;
        return 'Gold';
    };
    Restoran.prototype.najProfitabilnijiTipPoKlijentu = function () {
        return;
    };
    Object.defineProperty(Restoran.prototype, "naziv", {
        // Metoda vraca spisak najprofitabilnijeg tipa jela po klijentu kao string:
        // 	Pera Peric je najviše potrošio na tip "Glavno jelo" (3820) <br>
        // 	Mika Mikic je najviše potrošio na tip "Predjelo" (1280) <br>
        // 	Zika Zikic je najviše potrošio na tip "Glavno jelo" (2500) <br>
        // 	Petar Petrovic je najviše potrošio na tip "Predjelo" (460) <br>
        // 	Ljubo Ljubic je najviše potrošio na tip "Predjelo" (1060) <br>
        // Za svakog klijenta, za svaku zatvorenu porudzbinu, se sumira koliko je potrosio
        // novca za svaki tip StavkeJelovnika. Nakon toga za svakog klijenta se odredjuje koji
        // tip ima maksimalnu vrednost i on se racuna kao najprofitabilnija za tog klijenta.
        // Npr. sa testinm podacima dobicemo sledece vrednosti: 
        // 	{
        // 	   "Pera Peric":{
        // 		  "Predjelo":530,
        // 		  "Glavno jelo":3820,
        // 		  "Desert":1690
        // 	   },
        // 	   "Mika Mikic":{
        // 		  "Predjelo":1280
        // 	   },
        // 	   "Zika Zikic":{
        // 		  "Glavno jelo":2500,
        // 		  "Desert":910,
        // 		  "Predjelo":460
        // 	   },
        // 	   "Petar Petrovic":{
        // 		  "Predjelo":460
        // 	   },
        // 	   "Ljubo Ljubic":{
        // 		  "Predjelo":1060
        // 	   }
        // 	}
        // Iz kojih mozemo da zakljucimo na koji tip su su klijenti najvise novca potrosili.
        /**
         * Getter naziv
         * @return {string}
         */
        get: function () {
            return this._naziv;
        },
        /**
         * Setter naziv
         * @param {string} value
         */
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Restoran.prototype, "jelovnik", {
        /**
         * Getter jelovnik
         * @return {StavkaJelovnika[]}
         */
        get: function () {
            return this._jelovnik;
        },
        /**
         * Setter jelovnik
         * @param {StavkaJelovnika[]} value
         */
        set: function (value) {
            this._jelovnik = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Restoran.prototype, "porudzbine", {
        /**
         * Getter porudzbine
         * @return {Porudzbina[]}
         */
        get: function () {
            return this._porudzbine;
        },
        /**
         * Setter porudzbine
         * @param {Porudzbina[]} value
         */
        set: function (value) {
            this._porudzbine = value;
        },
        enumerable: false,
        configurable: true
    });
    Restoran.BODOVI_PO_TIPU = { "Predjelo": 1, "Glavno jelo": 3, "Desert": 1 };
    Restoran.BODOVI_ZA_GOLD = 10;
    return Restoran;
}());
/// <reference path="Restoran.ts" />
var stavkeJelovnikaInit;
var porudzbineInit;
var otvorenaPorudzbina = null;
var aktivanRestoran = new Restoran("Kod Raspevanog Italijana");
function otvoriPorudzbinu(forma) {
    var ime = forma.ime.value;
    var datum = new Date();
    var porudzbina = aktivanRestoran.napraviPorudzbinu(ime, datum);
    otvorenaPorudzbina = porudzbina;
    document.getElementById("idp").value = otvorenaPorudzbina.id.toString();
    document.getElementById("imep").value = otvorenaPorudzbina.imeKlijenta;
    document.getElementById("datump").value = otvorenaPorudzbina.datum.toLocaleString();
    document.getElementById("otvorenaporudzbinadiv").hidden = false;
    aktivanRestoran.refreshJelovnik();
    document.getElementById("jelovnikdiv").hidden = false;
    document.getElementById("ispis").innerHTML = "";
    document.getElementById("otvoribtn").disabled = true;
    return false;
}
function clickedMenu(id) {
    var sJ = aktivanRestoran.getStavkaJelovnikaById(id);
    var sP = null;
    var porudzbina = otvorenaPorudzbina.stavke.find(function (p) { return p.stavkaJelovnika.id == sJ.id; });
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
function skracenica() {
    document.getElementById('otvorenaporudzbinadiv').hidden = true;
    document.getElementById('jelovnikdiv').hidden = true;
    otvorenaPorudzbina.status = 'Zatvorena';
    document.getElementById('otvoribtn').disabled = false;
}
function zatvoriPorudzbinu() {
    skracenica();
    var p = document.getElementById('ispis');
    p.innerHTML = "\n    Porudzbina broj: ".concat(otvorenaPorudzbina.id, "\n    // \t\t\tKlijent: ").concat(otvorenaPorudzbina.imeKlijenta, "\n    // \t\t\tDatum: ").concat(otvorenaPorudzbina.datum, "\n    //          Status: ").concat(otvorenaPorudzbina.status, "\n    // \t\t\tNaru\u010Deno:\n    // \t\t\t ").concat(otvorenaPorudzbina.stavke, "\n    // \t\t\n    // \t\t\t\n    \n    // \t\t\tUkupna za naplatu: 2720\n    ");
    otvorenaPorudzbina = null;
}
function otkaziPorudzbinu() {
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
};
function ucitajPodatke() {
    for (var i = 0; i < stavkeJelovnikaInit.length; i++) {
        var st = new StavkaJelovnika(stavkeJelovnikaInit[i].naziv, stavkeJelovnikaInit[i].cena, stavkeJelovnikaInit[i].tip);
        aktivanRestoran.dodajStavkuJelovnika(st);
    }
    for (var i = 0; i < porudzbineInit.length; i++) {
        var p = new Porudzbina(porudzbineInit[i].imeKlijenta, new Date(porudzbineInit[i].datum), porudzbineInit[i].status);
        for (var _i = 0, _a = porudzbineInit[i].stavke; _i < _a.length; _i++) {
            var stavka = _a[_i];
            var st = aktivanRestoran.getStavkaJelovnikaById(stavka.idstavke);
            var kolicina = stavka.kolicina;
            var stpor = new StavkaPorudzbine(st, kolicina);
            p.stavke.push(stpor);
        }
        aktivanRestoran.porudzbine.push(p);
    }
}
//# sourceMappingURL=app.js.map