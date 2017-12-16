declare const require;
const _ = require('lodash');

export class Queue<T> {

    private buffer : T[];

    constructor(private readonly maxLength : number) {
        this.buffer = [];
    }

    push(entry : T) : void {
        if(this.buffer.length < this.maxLength) {
            this.buffer.push(entry);
        } else {
            this.buffer = _.drop(this.buffer).push(entry);
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