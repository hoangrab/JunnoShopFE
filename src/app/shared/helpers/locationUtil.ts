import { location } from "../model/location";

export const locationUtil = {
    loca : location,
    getCity() {

    },

    getWard(idCity : string) {
        return this.loca.find( e => e.Id == idCity)?.Districts;
    },

    getDistrict(idCity : string,idWard : string) {
        return this.getWard(idCity)?.find(e => e.Id == idWard)?.Wards;
    }
}