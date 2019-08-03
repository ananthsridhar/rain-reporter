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

    success(position) {
        this.setState({
            location: position.coords
        })
    },

    error() {
        alert('Unable to retrieve your location');
    },

    //Filter Functions
    getTimeLowerBound(limit) {
        let now = new Date();
        // console.log(now.getDay());
        // now = now.getMilliseconds();
        let retVal;
        switch (limit) {
            case Constants.DAY: retVal = new Date(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours()-24);
                //console.log(retVal);
                break;
            case Constants.WEEK: retVal = new Date(now.getFullYear(), now.getMonth(), now.getDate()-7);
                //console.log(retVal);
                break;
            case Constants.MONTH: retVal = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());
                //console.log(retVal);
                break;
            default: retVal = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());
        }
        return retVal;
    }
}

export default Utilities;