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
            out += "\n            <li class=\"list-group-item list-group-item-action d-flex justify-content-between align-items-start\" onclick=\"clickedMenu(".concat(spanJelovnik.id, ")\">\n                <div class=\"ms-2 me-auto fw-bold\"> ").concat(spanJelovnik.naziv, " ").concat(spanJelovnik.cena, "</div>\n                <span class=\"badge bg-primary rounded-pill\" id=\"spanJelovnik").concat(spanJelovnik.id, "\"></span>\n            </li>\n            ");
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
        var klijenti = this._porudzbine.reduce(function (acc, klijent) {
            if (klijent.status !== "Zatvorena")
                return acc;
            if (!acc[klijent.imeKlijenta]) {
                acc[klijent.imeKlijenta] = [];
            }
            klijent.stavke.forEach(function (stavka) {
                if (!acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip]) {
                    acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
                }
                acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] += Restoran.BODOVI_PO_TIPU[stavka.stavkaJelovnika.tip] * stavka.kolicina;
            });
            return acc;
        }, {});
        var out = '';
        Object.entries(klijenti).forEach(function (_a) {
            var kljuc = _a[0], vrednost = _a[1];
            var ukupnoBodova = 0;
            var klijent = '';
            Object.entries(vrednost).forEach(function (_a) {
                var predjelo = _a[0], bodovi = _a[1];
                ukupnoBodova += bodovi;
                klijent = kljuc;
            });
            if (ukupnoBodova > Restoran.BODOVI_ZA_GOLD) {
                return out += "U spisak za gold klijente upisali su se ".concat(klijent, " ukupno je osvojio ").concat(ukupnoBodova, "<br/>");
            }
        });
        return out;
    };
    // public zlatniKlijenti(): string {
    //     let skorKlijenta = {};
    //     for (let porudzbina of this._porudzbine) {
    //         if (porudzbina.status != "Zatvorena")
    //             continue;
    //         if (!(porudzbina.imeKlijenta in skorKlijenta)) {
    //             skorKlijenta[porudzbina.imeKlijenta] = 0;
    //         }
    //         for (let stavka of porudzbina.stavke) {
    //             skorKlijenta[porudzbina.imeKlijenta] += Restoran.BODOVI_PO_TIPU[stavka.stavkaJelovnika.tip] * stavka.kolicina;
    //         }
    //     }
    //     let hasGold = false;
    //     let out = "Spisak GOLD klijenata: <br/>";
    //     for (let klijent in skorKlijenta) {
    //         if (skorKlijenta[klijent] > Restoran.BODOVI_ZA_GOLD) {
    //             hasGold = true;
    //             out += `${klijent} sa ${skorKlijenta[klijent]} ukupno bodova. <br/>`
    //         }
    //     }
    //     if (hasGold)
    //         return out;
    //     return "Restoran trenutno nema GOLD klijente";
    // }
    // najProfitabilnijiTipPoKlijentu(): string {
    //     const klijenti = this._porudzbine.reduce((acc, porudzbina) => {
    //         if (porudzbina.status !== 'Zatvorena') return acc;
    //         if (!acc[porudzbina.imeKlijenta]) {
    //             acc[porudzbina.imeKlijenta] = {};
    //         }
    //         porudzbina.stavke.forEach(stavka => {
    //             if (!acc[porudzbina.imeKlijenta][stavka.stavkaJelovnika.tip]) {
    //                 acc[porudzbina.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
    //             }
    //             acc[porudzbina.imeKlijenta][stavka.stavkaJelovnika.tip] += stavka.stavkaJelovnika.cena * stavka.kolicina;
    //         });
    //         return acc;
    //     }, {});
    //     const out = Object.entries(klijenti).map(([klijent, potroseno]) => {
    //         let maxTip = '';
    //         let maxCena = Number.NEGATIVE_INFINITY;
    //         Object.entries(potroseno).forEach(([tip, cena]) => {
    //             if (cena > maxCena) {
    //                 maxCena = cena;
    //                 maxTip = tip;
    //             }
    //         });
    //         return `${klijent} je najviše potrošio na tip "${maxTip}" (${maxCena})`;
    //     }).join('<br/>');
    //     console.log(klijenti);
    //     return out;
    // }
    // najProfitabilnijiTipPoKlijentu(): string {
    //     const klijenti = this._porudzbine.reduce((acc, klijent) => {
    //         if (klijent.status !== 'Zatvorena') return acc;
    //         if (!acc[klijent.imeKlijenta]) {
    //             acc[klijent.imeKlijenta] = {};
    //         }
    //         klijent.stavke.forEach(stavka => {
    //             if (!acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip]) {
    //                 acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
    //             }
    //             acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] += stavka.stavkaJelovnika.cena * stavka.kolicina;
    //         });
    //         return acc;
    //     }, {})
    //     console.log(klijenti);
    //     const out = Object.entries(klijenti).map(([klijent, predjelo]: [string, number]) => {
    //         let maxRacun: number = Number.NEGATIVE_INFINITY;
    //         let maxTip: string;
    //         Object.entries(predjelo).forEach(([tip, racun]) => {
    //             if (maxRacun < racun) {
    //                 maxRacun = racun;
    //                 maxTip = tip;
    //             }
    //         });
    //         return `${klijent} je najviše potrošio na tip ${maxTip} (${maxRacun})`;
    //     }).join('<br/>');
    //     return out;
    // }
    Restoran.prototype.najProfitabilnijiTipPoKlijentu = function () {
        var imenima = this._porudzbine.reduce(function (acc, imena) {
            if (imena.status !== 'Zatvorena')
                return acc;
            if (!acc[imena.imeKlijenta]) {
                acc[imena.imeKlijenta] = [];
            }
            imena.stavke.forEach(function (stavka) {
                if (!acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip]) {
                    acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
                }
                acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip] += stavka.kolicina * stavka.stavkaJelovnika.cena;
            });
            return acc;
        }, {});
        console.log(imenima);
        var rezultat = '';
        Object.entries(imenima).forEach(function (_a) {
            var kljuc = _a[0], nizJeloCena = _a[1];
            var maxIme = '';
            var maxCena = 0;
            Object.entries(nizJeloCena).forEach(function (_a) {
                var jelo = _a[0], cena = _a[1];
                if (maxCena < cena) {
                    maxCena = cena;
                    maxIme = jelo;
                }
            });
            rezultat += "".concat(kljuc, " je najvi\u0161e potro\u0161io/la na ").concat(maxIme, " (cena: ").concat(maxCena, ").<br/>");
        });
        return rezultat;
    };
    Object.defineProperty(Restoran.prototype, "naziv", {
        // const bolnicama = bolnice.reduce((acc, { grad, pacijenti }) => {
        //     acc[grad] = pacijenti.filter(p => p.pcrTest === 'Pozitivan');
        //     return acc;
        // }, {});
        // najProfitabilnijiTipPoKlijentu(): string
        // Metoda vraca spisak najprofitabilnijeg tipa jela po klijentu kao string:
        //     Pera Peric je najviše potrošio na tip "Glavno jelo" (3820) <br>
        //     Mika Mikic je najviše potrošio na tip "Predjelo" (1280) <br>
        //     Zika Zikic je najviše potrošio na tip "Glavno jelo" (2500) <br>
        //     Petar Petrovic je najviše potrošio na tip "Predjelo" (460) <br>
        //     Ljubo Ljubic je najviše potrošio na tip "Predjelo" (1060) <br>
        // Za svakog klijenta, za svaku zatvorenu porudzbinu, se sumira koliko je potrosio
        // novca za svaki tip StavkeJelovnika. Nakon toga za svakog klijenta se odredjuje koji
        // tip ima maksimalnu vrednost i on se racuna kao najprofitabilnija za tog klijenta.
        // Npr. sa testinm podacima dobicemo sledece vrednosti: 
        //     {
        //        "Pera Peric":{
        //           "Predjelo":530,
        //           "Glavno jelo":3820,
        //           "Desert":1690
        //        },
        //        "Mika Mikic":{
        //           "Predjelo":1280
        //        },
        //        "Zika Zikic":{
        //           "Glavno jelo":2500,
        //           "Desert":910,
        //           "Predjelo":460
        //        },
        //        "Petar Petrovic":{
        //           "Predjelo":460
        //        },
        //        "Ljubo Ljubic":{
        //           "Predjelo":1060
        //        }
        //     }
        // Iz kojih mozemo da zakljucimo na koji tip su su klijenti najvise novca potrosili.
        // public najProfitabilnijiTipPoKlijentu(): string {
        //     let klijenti = {};
        //     for (let porudzbina of this._porudzbine) {
        //         if (porudzbina.status != "Zatvorena")
        //             continue;
        //         if (!(porudzbina.imeKlijenta in klijenti)) {
        //             klijenti[porudzbina.imeKlijenta] = {};
        //         }
        //         for (let stavka of porudzbina.stavke) {
        //             if (!(stavka.stavkaJelovnika.tip in klijenti[porudzbina.imeKlijenta])) {
        //                 klijenti[porudzbina.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
        //             }
        //             klijenti[porudzbina.imeKlijenta][stavka.stavkaJelovnika.tip] += stavka.stavkaJelovnika.cena * stavka.kolicina;
        //         }
        //     }
        //     let out = "";
        //     for (let klijent in klijenti) {
        //         let potroseno = klijenti[klijent];
        //         let maxTip = "";
        //         let maxCena = Number.NEGATIVE_INFINITY;
        //         for (let tip in potroseno) {
        //             if (potroseno[tip] > maxCena) {
        //                 maxCena = potroseno[tip];
        //                 maxTip = tip;
        //             }
        //         }
        //         out += `${klijent} je najviše potrošio na tip "${maxTip}" (${maxCena}) <br/>`;
        //     }
        //     return out;
        // }
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
    Restoran.BODOVI_ZA_GOLD = 1;
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
    var cena = 0;
    var out = " \n        Porudzbina broj: ".concat(otvorenaPorudzbina.id, " <br>\n        Klijent: ").concat(otvorenaPorudzbina.imeKlijenta, " <br>\n        Datum: ").concat(otvorenaPorudzbina.datum, " <br>\n        Naru\u010Deno:<br>");
    for (var i = 0; i < otvorenaPorudzbina.stavke.length; i++) {
        cena += otvorenaPorudzbina.stavke[i].stavkaJelovnika.cena * otvorenaPorudzbina.stavke[i].kolicina;
        out += "\n            ".concat(otvorenaPorudzbina.stavke[i].stavkaJelovnika.naziv, " x").concat(otvorenaPorudzbina.stavke[i].kolicina, "<br>\n        ");
    }
    out += "Ukupna za naplatu:<br>".concat(cena, "din");
    p.innerHTML += out;
    otvorenaPorudzbina = null;
}
function otkaziPorudzbinu() {
    otvorenaPorudzbina.status = 'Otkazana';
    skracenica();
}
function zlatniKlijenti() {
    document.getElementById("ispis").innerHTML = aktivanRestoran.zlatniKlijenti();
}
function jelaPoKlijentu() {
    document.getElementById("ispis").innerHTML = aktivanRestoran.najProfitabilnijiTipPoKlijentu();
}
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