namespace Termin.Services {

    export enum Language {
        ru = "ru",
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

        public l = "rgwergewr";

        public listLanguages: string[] = [Language.en, Language.ru];

        public setLanguage(lang: Language) {
            localStorage.setItem("Language", lang);
            //apply todo проверить
        }

        get(): IDictionary {
            let dictionary: IDictionary;

            if (this.language == Language.en || !this.getLanguage() || this.getLanguage() == Language.en)
                return this.en;

            if (this.language == Language.ru || this.getLanguage() == Language.ru)
                return this.ru;
        }

        private ru = {
            title: "Система - Термин",
            exit: "Выход",
            calendar: "Календарь",
            additional: "Добавление",
            users: "Пользователи",
            terminDate: 'Дата "Термина"',
            secondName: "Фамилия",
            firstName: "Имя",
            bethday: "День рождения",
            phone1: "Телефон 1",
            phone2: "Телефон 2",
            region: "Регион",
            insurance: "Страховка",
            zuweiser: "Рефералы",
            comment: "Комментарий",
            add: "Добавить",
            save: "Сохранить",
            cancel: "Отменить",
            change: "Внести изменения",
            del: "Удалить",
            clear: "Очистить",
            administrator: "Администратор",
            user: "Пользователь",
            wasSave: "Сохранено",
            wasCreate: "Создано"
        };

        private en = {
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
            wasCreate: "Created successfully"
        }
    }

}