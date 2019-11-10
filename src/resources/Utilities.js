import { Constants } from "./Constants";

const Utilities = {
    getLocation(success) {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            console.log("Location Available");
            // navigator.geolocation.getCurrentPosition(success, this.error);
            navigator.geolocation.watchPosition(success, this.error);
        } else {
            /* geolocation IS NOT available */
            console.log("Location NOT Available");
        }
    },

    error() {
        alert('Unable to retrieve your location');
    },

    //Filter Functions
    getTimeLowerBound(limit) {
        let now = new Date();
        let retVal;
        switch (limit) {
            case Constants.DAY: retVal = new Date(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours()-24);
                break;
            case Constants.WEEK: retVal = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7);
                break;
            case Constants.MONTH: retVal = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());
                break;
            default: retVal = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());
        }
        return retVal;
    },

    getFormattedTime(timeInMillis){
        let d = new Date(parseInt(timeInMillis));
        return d.toLocaleString();
    },

    getIntensity(quantity,val){
        let qArr = (quantity==='rain'?Constants.rainIntensityList:Constants.floodIntensityList);
        let obj = qArr.find(o => o.value === val);
        return obj.label;
    }
}

export default Utilities;