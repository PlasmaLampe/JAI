declare const require;
const _ = require('lodash');

export class Queue<T> {

    private buffer : T[];

    constructor(private readonly maxLength : number) {
        this.buffer = [];
        console.log('>> Creating Queue with max length of ' + this.maxLength)
    }

    push(entry : T) : void {
        if(this.buffer.length < this.maxLength) {
            this.buffer.push(entry);
        } else {
            let newBuffer: T[] = [];

            for(let pos: number = 1; pos < this.maxLength; pos ++) {
                newBuffer.push(this.buffer[pos]);
            }
            newBuffer.push(entry);

            this.buffer = newBuffer;
        }
    }

    pop() : T {
        if(this.buffer.length > 0) {
            return this.buffer.pop();
        }
        return null;
    }

    public getContent(): T[] {
        return this.buffer;
    }

    /*walk<WalkOut>(f: (entry: T) => WalkOut) : WalkOut[] {
        return null;
    }*/

}