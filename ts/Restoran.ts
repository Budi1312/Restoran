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
            out = `
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
        let bodovi: number = 0;
        let brojac: number = 0;
        for (let i = 0; i < this._porudzbine.length; i++) {
            if (this._porudzbine[i].status == 'Zatvorena') {
                for (let j = 0; j < this._jelovnik.length; i++) {
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
        if (bodovi < Restoran.BODOVI_ZA_GOLD) return;
        return 'Gold';
    }

    najProfitabilnijiTipPoKlijentu(): string {
        return;
    }

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


