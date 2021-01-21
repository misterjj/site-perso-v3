export default class Conway {
    get nbGeneration(): number {
        return this._nbGeneration;
    }

    set nbGeneration(value: number) {
        this._nbGeneration = value;
    }
    get isLoop(): boolean {
        return this._isLoop;
    }

    set isLoop(value: boolean) {
        this._isLoop = value;
    }

    get reproductionTrigger(): number {
        return this._reproductionTrigger;
    }

    set reproductionTrigger(value: number) {
        this._reproductionTrigger = value;
    }

    get overpopulationTrigger(): number {
        return this._overpopulationTrigger;
    }

    set overpopulationTrigger(value: number) {
        this._overpopulationTrigger = value;
    }

    get underpopulationTrigger(): number {
        return this._underpopulationTrigger;
    }

    set underpopulationTrigger(value: number) {
        this._underpopulationTrigger = value;
    }

    get heightCellsNumber(): number {
        return this._heightCellsNumber;
    }

    set heightCellsNumber(value: number) {
        if (value % 2 === 1) {
            value++;
        }
        this._heightCellsNumber = value;
    }

    get withCellsNumber(): number {
        return this._withCellsNumber;
    }

    set withCellsNumber(value: number) {
        if (value % 2 === 1) {
            value++;
        }
        this._withCellsNumber = value;
    }

    get model(): boolean[][] {
        return this._model;
    }

    set model(value: boolean[][]) {
        this._model = value;
    }

    private _withCellsNumber: number
    private _heightCellsNumber: number
    private _model: boolean[][] = []
    private _underpopulationTrigger = 2
    private _overpopulationTrigger = 3
    private _reproductionTrigger = 3
    private _isLoop = true
    private _nbGeneration = 0

    loadFromString(str: string): void {
        let strToArray: string[][] = []
        for (let row of str.split('\n')) {
            strToArray.push(row.split(''))
        }

        let strWidth = strToArray[0].length
        if (strWidth % 2 === 1) {
            strWidth++;
        }
        let strHeight = strToArray.length
        if (strHeight % 2 === 1) {
            strHeight++;
        }
        let halfstrHeight = strHeight / 2
        let halfstrWidth = strWidth / 2

        let halfWidth = this.withCellsNumber / 2
        let halfHeight = this.heightCellsNumber / 2
        for (let v = 1; v <= halfHeight; v++) {
            if (this._model[halfHeight - v] === undefined) {
                this._model[halfHeight - v] = [];
            }
            if (this._model[halfHeight + v - 1] === undefined) {
                this._model[halfHeight + v - 1] = [];
            }
            for (let h = 1; h <= halfWidth; h++) {
                if (this._model[halfHeight - v][halfWidth - h] === undefined) {
                    this._model[halfHeight - v][halfWidth - h] =
                        strToArray[halfstrHeight - v] &&
                        strToArray[halfstrHeight - v][halfstrWidth - h] !== undefined &&
                        strToArray[halfstrHeight - v][halfstrWidth - h] === 'X';
                }
                if (this._model[halfHeight - v][halfWidth + h - 1] === undefined) {
                    this._model[halfHeight - v][halfWidth + h - 1] =
                        strToArray[halfstrHeight - v] !== undefined &&
                        strToArray[halfstrHeight - v][halfstrWidth + h - 1] !== undefined &&
                        strToArray[halfstrHeight - v][halfstrWidth + h - 1] === 'X';
                }
                if (this._model[halfHeight + v - 1][halfWidth - h] === undefined) {
                    this._model[halfHeight + v - 1][halfWidth - h] =
                        strToArray[halfstrHeight + v - 1] !== undefined &&
                        strToArray[halfstrHeight + v - 1][halfstrWidth - h] !== undefined &&
                        strToArray[halfstrHeight + v - 1][halfstrWidth - h] === 'X';
                }
                if (this._model[halfHeight + v - 1][halfWidth + h - 1] === undefined) {
                    this._model[halfHeight + v - 1][halfWidth + h - 1] =
                        strToArray[halfstrHeight + v - 1] !== undefined &&
                        strToArray[halfstrHeight + v - 1][halfstrWidth + h - 1] !== undefined &&
                        strToArray[halfstrHeight + v - 1][halfstrWidth + h - 1] === 'X';
                }
            }
        }

        this.nbGeneration = 1;
    }

    newGeneration() {
        const oldGeneration = [...this.model]

        let neighboursCounts : {
            h: number,
            w: number
            count: number,
        }[] = []

        for (let h = 0; h < oldGeneration.length; h++) {
            for (let w = 0; w < oldGeneration[h].length; w++) {
                let neighboursCount = 0;
                for (let i = -1; i<=1; i++) {
                    for (let j = -1; j<=1; j++) {
                        if (i === 0 && j === 0) {
                            continue
                        }
                        if (
                            oldGeneration[h + i] !== undefined &&
                            oldGeneration[h + i][w + j] !== undefined &&
                            oldGeneration[h + i][w + j] === true
                        ) {
                            neighboursCount++;
                        } else if (
                            (
                                oldGeneration[h + i] === undefined ||
                                oldGeneration[h + i][w + j] === undefined
                            )
                            && this._isLoop
                            && true === oldGeneration[(h + i + this._heightCellsNumber) % this._heightCellsNumber][(w + j + this._withCellsNumber) % this._withCellsNumber]
                        ) {
                            neighboursCount++;
                        }
                    }
                }

                neighboursCounts.push({
                    count : neighboursCount,
                    h : h,
                    w : w
                })
            }
        }

        for (let neighboursCountObjet of  neighboursCounts) {
            let h = neighboursCountObjet.h
            let w = neighboursCountObjet.w
            let neighboursCount = neighboursCountObjet.count

            if (oldGeneration[h][w] === true) {
                if (neighboursCount < this._underpopulationTrigger) {
                    this.model[h][w] = false;
                } else this.model[h][w] = neighboursCount <= this._overpopulationTrigger;
            } else {
                this.model[h][w] = neighboursCount === this._reproductionTrigger;
            }
        }

        this.nbGeneration++;
    }
}