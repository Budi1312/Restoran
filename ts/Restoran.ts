/// <reference path="StavkaJelovnika.ts" />
/// <reference path="Porudzbina.ts" />
/// <reference path="StavkaPorudzbine.ts" />


class Restoran {

    static readonly BODOVI_PO_TIPU = { "Predjelo": 1, "Glavno jelo": 3, "Desert": 1 };
    static readonly BODOVI_ZA_GOLD = 1;

    private _naziv: string;
    private _jelovnik: StavkaJelovnika[];
    private _porudzbine: Porudzbina[];

    constructor(naziv: string) {
        this._naziv = naziv;
        this._jelovnik = [];
        this._porudzbine = [];
    }

    dodajStavkuJelovnika(stavkeJelovnika: StavkaJelovnika): void {
        this._jelovnik.push(stavkeJelovnika);
        this.refreshJelovnik();
    }

    refreshJelovnik() {
        let out: string = '';
        for (let i = 0; i < this._jelovnik.length; i++) {
            const spanJelovnik = this._jelovnik[i];
            out += `
            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start" onclick="clickedMenu(${spanJelovnik.id})">
                <div class="ms-2 me-auto fw-bold"> ${spanJelovnik.naziv} ${spanJelovnik.cena}</div>
                <span class="badge bg-primary rounded-pill" id="spanJelovnik${spanJelovnik.id}"></span>
            </li>
            `;
        }
        document.getElementById('listajelovnik').innerHTML = out;

    }

    napraviPorudzbinu(imeKlijenta: string, datum: Date): Porudzbina {
        if (imeKlijenta == null) return;
        const porudzbina = new Porudzbina(imeKlijenta, datum);
        this._porudzbine.push(porudzbina);
        return porudzbina;
    }

    getStavkaJelovnikaById(id: number): StavkaJelovnika {
        const jelovnik = this._jelovnik.find((j => j.id === id));
        if (!jelovnik) return null;
        return jelovnik;
    }

    public zlatniKlijenti(): string {

        const klijenti = this._porudzbine.reduce((acc, klijent) => {
            if (klijent.status !== "Zatvorena") return acc;
            if (!acc[klijent.imeKlijenta]) {
                acc[klijent.imeKlijenta] = [];
            }
            klijent.stavke.forEach(stavka => {
                if (!acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip]) {
                    acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
                }
                acc[klijent.imeKlijenta][stavka.stavkaJelovnika.tip] += Restoran.BODOVI_PO_TIPU[stavka.stavkaJelovnika.tip] * stavka.kolicina;
            });
            return acc;
        }, {});

        let out: string = '';
        Object.entries(klijenti).forEach(([kljuc, vrednost]: [string, {}]) => {
            let ukupnoBodova: number = 0;
            let klijent: string = '';
            Object.entries(vrednost).forEach(([predjelo, bodovi]: [string, number]) => {
                ukupnoBodova += bodovi;
                klijent = kljuc;
            });

            if (ukupnoBodova > Restoran.BODOVI_ZA_GOLD) {
                return out += `U spisak za gold klijente upisali su se ${klijent} ukupno je osvojio ${ukupnoBodova}<br/>`
            }

        });
        return out;
    }


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





    najProfitabilnijiTipPoKlijentu(): string {
        const imenima = this._porudzbine.reduce((acc, imena) => {
            if (imena.status !== 'Zatvorena') return acc;
            if (!acc[imena.imeKlijenta]) {
                acc[imena.imeKlijenta] = [];
            }
            imena.stavke.forEach(stavka => {
                if (!acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip]) {
                    acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip] = 0;
                }
                acc[imena.imeKlijenta][stavka.stavkaJelovnika.tip] += stavka.kolicina * stavka.stavkaJelovnika.cena;
            });
            return acc;
        }, {});
        console.log(imenima);
        let rezultat: string = '';

        Object.entries(imenima).forEach(([kljuc, nizJeloCena]: [string, {}]) => {
            let maxIme: string = '';
            let maxCena: number = 0;
            Object.entries(nizJeloCena).forEach(([jelo, cena]: [string, number]) => {
                if (maxCena < cena) {
                    maxCena = cena;
                    maxIme = jelo;
                }
            });
            rezultat += `${kljuc} je najviše potrošio/la na ${maxIme} (cena: ${maxCena}).<br/>`;
        });

        return rezultat;
    }

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
    public get naziv(): string {
        return this._naziv;
    }

    /**
     * Getter jelovnik
     * @return {StavkaJelovnika[]}
     */
    public get jelovnik(): StavkaJelovnika[] {
        return this._jelovnik;
    }

    /**
     * Getter porudzbine
     * @return {Porudzbina[]}
     */
    public get porudzbine(): Porudzbina[] {
        return this._porudzbine;
    }

    /**
     * Setter naziv
     * @param {string} value
     */
    public set naziv(value: string) {
        this._naziv = value;
    }

    /**
     * Setter jelovnik
     * @param {StavkaJelovnika[]} value
     */
    public set jelovnik(value: StavkaJelovnika[]) {
        this._jelovnik = value;
    }

    /**
     * Setter porudzbine
     * @param {Porudzbina[]} value
     */
    public set porudzbine(value: Porudzbina[]) {
        this._porudzbine = value;
    }
}


