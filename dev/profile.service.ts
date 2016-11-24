import {Injectable} from "angular2/core";
import {Profile} from "./profile";
import {Observable} from "rxjs/Observable";
@Injectable()
export class ProfileService {
    private profiles: Profile[] = [
        new Profile('List Demo', ['Beijing','New York', 'London', 'Berlin'])
    ];

    saveNewProfile(cities: string[]): Observable<any> {
        const profileName = 'List ' + (this.profiles.length);
        const profile = new Profile(profileName, cities);
        this.profiles.push(profile);
        return null;
    }

    getProfiles() {
        return this.profiles;
    }

    deleteProfile(profile: Profile): Observable<any> {
        this.profiles = this.profiles.splice(this.profiles.indexOf(profile), 1);
        console.log(this.profiles);
        return null;
    }
}