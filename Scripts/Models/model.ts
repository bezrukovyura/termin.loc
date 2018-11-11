namespace Termin {

    export class Unit {
        public date?: string;
        public hour?: string;
        public minute?: string;
        public fam?: string;
        public name?: string;
        public birthday?: string;
        public phone1?: string;
        public phone2?: string;
        public region?: string;
        public insurance?: string;
        public zuweiser?: string;
        public comments?: string;
        public id?: number;
        public userRegister?: string;
        public visitDateNumber?: string;
    }

    export class User {
        public id?: number;
        public name?: string;
        public email?: string;
        public role?: number;
        public password?: string;
        public key?: string;
    }
}