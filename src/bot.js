class Bot {
    constructor() {
        this.winnerCode = ['ABC', 'DEF', 'GHI', 'ADG', 'BEH', 'CFI', 'AEI', 'CEG'];
        this.moves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        this.move = null;
    };

    getRandomMove() {
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    };

    blockPlayer(moves) {
        if(moves.length < 2) {
            return this.setNxtMove(null);
        }
        const blockMove = this.winnerCode.find((code) => {
            let str1 = code.split('').sort();
            let str2 = moves.split('').sort();
            let res  = str1.filter((value) => str2.includes(value));
            return res.length === 2;
        });
        if(blockMove) {
            this.winnerCode = this.winnerCode.filter((code) => code !== blockMove);
            this.setNxtMove(this.moves.find((move) => blockMove.includes(move)));
        } else {
            this.setNxtMove(null);
        }
    };

    findMove(moves) {
        if(this.move) {
            return false;
        } else {
            const goodMove = this.winnerCode.find((code) => {
                let str1 = code.split('').sort();
                let str2 = moves.split('').sort();
                let res = str1.filter((value) => str2.includes(value));
                return res.length === 2;
            });
            if(goodMove) {
                this.setNxtMove(this.moves.find((move) => goodMove.includes(move)));
            } else {
                this.setNxtMove(this.getRandomMove());
            }
        }
    };

    updateAvailableMoves(moves) {
        this.moves = this.moves.filter((move) => !moves.playerOne.includes(move) && !moves.playerTwo.includes(move));
        this.winnerCode = this.winnerCode.filter((code) => {
            let str1 = code.split('').sort();
            let str2 = moves.playerOne.split('').sort();
            let str3 = moves.playerTwo.split('').sort();
            let res1 = str1.filter((value) => str2.includes(value));
            let res2 = str1.filter((value) => str3.includes(value));
            if((res1.length === 2 || res2.length === 2) && (res1.length + res2.length !== 3)) {
                return true;
            }

            return !(res1.length + res2.length >= 2);
        });

        console.log(this.winnerCode, this.moves);
    };
    
    setNxtMove(move) {
        this.move = move;
    }
    
    getNxtMove() {
        return this.move;
    }
}

export default Bot;