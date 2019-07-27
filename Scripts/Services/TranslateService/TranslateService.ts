namespace Termin.Services {

    export enum Language {
        //ru = "ru",
        de = "de",
        en = "en"
    }


    export interface IDictionary {
        title: string;
        exit: string;
        calendar: string;
        additional: string;
        users: string;
        terminDate: string;
        secondName: string;
        firstName: string;
        bethday: string;
        phone1: string;
        phone2: string;
        region: string;
        insurance: string;
        zuweiser: string;
        comment: string;
        add: string;
        save: string;
        cancel: string;
        change: string;
        del: string;
        clear: string;
        administrator: string;
        user: string;

        wasSave: string;
        wasCreate: string;
        password: string;
        login: string;
        tryAgain: string;
        welcome: string;

        authorization: string;
        reserviert: string;
        dayoff: string;
        receptionTermin: string;

        This_time_is_busy: string;
        The_recording_is_NOT_saved: string;
        Record_is_NOT_deleted: string;
        Record: string;

        This_weekend: string;
        This_nonworking_day: string;
    }

    export class TranslateService {

        private getLanguage(): Language {
            return <Language>localStorage.getItem("Language");
        }

        public update() {
            debugger
            this.setLanguage(this.language);
        }

        public language: Language;

        public listLanguages: string[] = [Language.en, Language.de];

        public setLanguage(lang: Language) {
            localStorage.setItem("Language", lang);
        }

        get(): IDictionary {
            let dictionary: IDictionary;

            if (this.language == Language.en || !this.getLanguage() || this.getLanguage() == Language.en)
                return this.en;

            if (this.language == Language.de || this.getLanguage() == Language.de)
                return this.de;
        }

        // private ru: IDictionary = {
        //     title: "Система - Термин",
        //     exit: "Выход",
        //     calendar: "Календарь",
        //     additional: "Добавление",
        //     users: "Пользователи",
        //     terminDate: 'Дата "Термина"',
        //     secondName: "Фамилия",
        //     firstName: "Имя",
        //     bethday: "День рождения",
        //     phone1: "Телефон 1",
        //     phone2: "Телефон 2",
        //     region: "Регион",
        //     insurance: "Страховка",
        //     zuweiser: "Рефералы",
        //     comment: "Комментарий",
        //     add: "Добавить",
        //     save: "Сохранить",
        //     cancel: "Отменить",
        //     change: "Внести изменения",
        //     del: "Удалить",
        //     clear: "Очистить",
        //     administrator: "Администратор",
        //     user: "Пользователь",
        //     wasSave: "Сохранено",
        //     wasCreate: "Создано",
        //     password: "Пароль",
        //     login: "Вход",
        //     tryAgain: "Попробуйте снова...",
        //     welcome: "рады Вас видеть!",
        //     authorization: "Авторизация",
        //     reserviert: "Забронированно",
        //     dayoff: "Выходные"
        // };

        private en: IDictionary = {
            title: "System - Term",
            exit: "Exit",
            calendar: "Calendar",
            additional: "Adding",
            users: "Users",
            terminDate: 'Date of "Term"',
            secondName: "Last Name",
            firstName: "Name",
            bethday: "Birthday",
            phone1: "Phone 1",
            phone2: "Phone 2",
            region: "Region",
            insurance: "Insurance",
            zuweiser: "Referrals",
            comment: "Comment",
            add: "Add",
            save: "Save",
            cancel: "Cancel",
            change: "Make changes",
            del: "Delete",
            clear: "Clear",
            administrator: "Administrator",
            user: "User",
            wasSave: "Saved successfully",
            wasCreate: "Created successfully",
            password: "Password",
            login: "Login",
            tryAgain: "Try again...",
            welcome: "welcom!!!",
            authorization: "Authorization",
            reserviert: "Reserviert",
            dayoff: "Holidays",
            receptionTermin: "reception termin",

            This_time_is_busy: 'This time is busy!',
            The_recording_is_NOT_saved: 'The recording is NOT saved! Try again.',
            Record_is_NOT_deleted: 'Record is NOT deleted! Try again.',
            Record: 'Record',

            This_weekend: 'This is a weekend',
            This_nonworking_day: 'This is a nonworking day'
        }

        private de: IDictionary = {
            title: "MRT - Portal | Terminkalender",
            exit: "Abmelden",
            calendar: "Kalender",
            additional: "Eingabe",
            users: "Users",
            terminDate: 'Untersuchung am',
            secondName: "Name",
            firstName: "Vorname",
            bethday: "Geburtsdatum",
            phone1: "Handy",
            phone2: "Telefon",
            region: "Untersuchungsregion",
            insurance: "Krankenversicherung",
            zuweiser: "Überweisender Arzt",
            comment: "Kommentar",
            add: "Hinzufügen",
            save: "Save",
            cancel: "Leeren",
            change: "Make changes",
            del: "Delete",
            clear: "Clear",
            administrator: "Administrator",
            user: "User",
            wasSave: "Saved successfully",
            wasCreate: "Created successfully",
            password: "Passwort",
            login: "Login",
            tryAgain: "Try again...",
            welcome: "welcom!!!",
            authorization: "Anmelden",
            reserviert: "Reserviert",
            dayoff: "Holidays",
            receptionTermin: "reception termin",

            This_time_is_busy: 'This time is busy!',
            The_recording_is_NOT_saved: 'The recording is NOT saved! Try again.',
            Record_is_NOT_deleted: 'Record is NOT deleted! Try again.',
            Record: 'Record',

            This_weekend: 'This is a weekend',
            This_nonworking_day: 'This is a nonworking day'

        }
    }

}