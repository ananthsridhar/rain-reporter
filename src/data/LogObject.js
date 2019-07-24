
export default class LogObject {
    constructor(data) {
        this.timestamp = data.timestamp;
        this.loc = { lt: data.location.latitude, lo: data.location.longitude };
        this.ri = data.rainIntensity;
        this.fi = data.floodIntensity;
    }

    getTimestampObj = () => {
        return {
            loc: this.loc
        }
    }

    getDetailObj = () => {
        return {
            time: this.timestamp,
            loc: this.loc,
            ri: this.ri,
            fi: this.fi
        }
    }
}