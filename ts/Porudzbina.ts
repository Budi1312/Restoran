/// <reference path="StavkaPorudzbine.ts" />

class Porudzbina {

    static LAST_ID: number = 0;

    private _id: number;
    private _imeKlijenta: string;
    private _datum: Date;
    private _status: string;
    private _stavke: StavkaPorudzbine[];

    constructor(imeKlijenta: string, datum: Date, status = "Otvorena") {
        Porudzbina.LAST_ID++;

        this._id = Porudzbina.LAST_ID;
        this._stavke = [];
        this._imeKlijenta = imeKlijenta;
        this._datum = datum;
        this.status = status;
        // this._status = status;
    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter imeKlijenta
     * @return {string}
     */
    public get imeKlijenta(): string {
        return this._imeKlijenta;
    }

    /**
     * Getter datum
     * @return {Date}
     */
    public get datum(): Date {
        return this._datum;
    }

    /**
     * Getter status
     * @return {string}
     */
    public get status(): string {
        return this._status;
    }

    /**
     * Getter stavke
     * @return {StavkaPorudzbine[]}
     */
    public get stavke(): StavkaPorudzbine[] {
        return this._stavke;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter imeKlijenta
     * @param {string} value
     */
    public set imeKlijenta(value: string) {
        this._imeKlijenta = value;
    }

    /**
     * Setter datum
     * @param {Date} value
     */
    public set datum(value: Date) {
        this._datum = value;
    }

    /**
     * Setter status
     * @param {string} value
     */
    public set status(value: string) {
        this._status = value;
    }

    /**
     * Setter stavke
     * @param {StavkaPorudzbine[]} value
     */
    public set stavke(value: StavkaPorudzbine[]) {
        this._stavke = value;
    }

}

