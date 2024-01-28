/// <reference path="StavkaJelovnika.ts" />

class StavkaPorudzbine {

    private _stavkaJelovnika: StavkaJelovnika;
    private _kolicina: number;

    constructor(stavkaJelovnika: StavkaJelovnika, kolicina: number) {
        this._stavkaJelovnika = stavkaJelovnika;
        this._kolicina = kolicina;
    }

    /**
     * Getter stavkaJelovnika
     * @return {StavkaJelovnika}
     */
    public get stavkaJelovnika(): StavkaJelovnika {
        return this._stavkaJelovnika;
    }

    /**
     * Getter kolicina
     * @return {number}
     */
    public get kolicina(): number {
        return this._kolicina;
    }

    /**
     * Setter stavkaJelovnika
     * @param {StavkaJelovnika} value
     */
    public set stavkaJelovnika(value: StavkaJelovnika) {
        this._stavkaJelovnika = value;
    }

    /**
     * Setter kolicina
     * @param {number} value
     */
    public set kolicina(value: number) {
        this._kolicina = value;
    }


}		
