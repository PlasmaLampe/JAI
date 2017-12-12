export class Util {

    private static debug = true;

    public static debugLog(msg: string, obj?: any) {
        if(Util.debug) {
            console.log.call(this,obj?[msg,obj]:[msg]);
        }
    }

    public static isDefined(o) : boolean {
        return typeof o !== 'undefined' && o !== null;
    }


}