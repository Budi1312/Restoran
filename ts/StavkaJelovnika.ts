class StavkaJelovnika {

    static LAST_ID: number = 0;

    private _id: number;
    private _naziv: string;
    private _cena: number;
    private _tip: string;

    constructor(naziv: string, cena: number, tip: string) {
        StavkaJelovnika.LAST_ID++;

        this._id = StavkaJelovnika.LAST_ID;
        this._naziv = naziv;
        this._cena = cena;
        this._tip = tip;
    }



    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter naziv
     * @return {string}
     */
    public get naziv(): string {
        return this._naziv;
    }

    /**
     * Getter cena
     * @return {number}
     */
    public get cena(): number {
        return this._cena;
    }

    /**
     * Getter tip
     * @return {string}
     */
    public get tip(): string {
        return this._tip;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter naziv
     * @param {string} value
     */
    public set naziv(value: string) {
        this._naziv = value;
    }

    /**
     * Setter cena
     * @param {number} value
     */
    public set cena(value: number) {
        this._cena = value;
    }

    /**
     * Setter tip
     * @param {string} value
     */
    public set tip(value: string) {
        this._tip = value;
    }



}
