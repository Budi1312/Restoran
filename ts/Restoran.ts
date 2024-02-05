/// <reference path="StavkaJelovnika.ts" />
/// <reference path="Porudzbina.ts" />
/// <reference path="StavkaPorudzbine.ts" />


class Restoran {

    static readonly BODOVI_PO_TIPU = { "Predjelo": 1, "Glavno jelo": 3, "Desert": 1 };
    static readonly BODOVI_ZA_GOLD = 10;

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
        const filtrirajPoStatusu = this._porudzbine.filter(p => p.status == 'Zatvorena');

        let grupisanoNacin = filtrirajPoStatusu.reduce((p, el) => {
            if (!(el.imeKlijenta in p)) {
                p[el.imeKlijenta] = [];
            }
            p[el.imeKlijenta].push(...el.stavke);
            return p;
        }, {});
        console.log(grupisanoNacin);

        const kljucevi = Object.keys(grupisanoNacin);

        // kljucevi.forEach(kljuc => {
        //     const kolicine = grupisanoNacin[kljuc].map(stavka => stavka.kolicina);
        //     console.log(`Kolicine za kljuc ${kljuc}: ${kolicine}`);
        //     // Ovde možeš raditi šta god želiš sa količinama za svaki ključ
        // });
        kljucevi.forEach(kljuc => {
            const kolicine = grupisanoNacin[kljuc].reduce((sum, stavka) => sum + stavka._kolicina, 0);
            console.log(`Ukupna količina za ${kljuc}: ${kolicine}`);
            // Ovde možeš raditi šta god želiš sa ukupnom količinom za svakog klijenta
        });
        return;
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



    najProfitabilnijiTipPoKlijentu(): string {
        return;
    }

    // public zlatniKlijenti(): string

    // 	Metoda vraca spisak GOLD klijenta restorana kao string:

    // 		Spisak GOLD klijenata: <br>
    // 		Pera Peric sa 11 ukupno bodova. <br>

    // 	GOLD klijenti su svi klijenti koji su u svojim porudzbinama sa statusom "Zatvorena" 
    // 	akumulirali broj bodova veci od staticke promenljive Restoran.BODOVI_ZA_GOLD.
    // 	Bodovi se racunaju tako sto se sumiraju bodovi na osnovu tipa StavkeJelovnika za svaku stavku 
    // 	(pomnozenu sa kolicinom) iz svake zatvorene porudzbine.
    // 	Bodovi za tip su dati u statickoj promenljivoj BODOVI_PO_TIPU.

    // 	Npr. u primeru racuna iznad:

    // 	Predjelo "Pohovani šampinjoni u sosu od gorgonzole" je naruceno dva puta -> 1 * 2 == 2 
    // 	Glavno jelo "Karađorđeva šnicla" je naruceno jednom -> 3 * 1 == 3
    // 	Desert "Krempita" je narucena jednom -> 1 * 1 == 1
    // 	Ukupno bodova za ovu porudzbinu klijent "Aleksandar" je 2 + 3 + 1 == 6

    // Iz kojih mozemo da zakljucimo na koji tip su su klijenti najvise novca potrosili.

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


