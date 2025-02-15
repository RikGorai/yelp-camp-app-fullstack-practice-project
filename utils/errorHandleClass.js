export default class ExpressError extends Error {
    constructor(status,msg) {
        super();
        this.message=msg;
        this.status = status;
    }
}