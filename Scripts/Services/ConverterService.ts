namespace Termin.Services {


    export class ConverterService {


        date(d: Date): string {
            if (!d || !d.getFullYear)
                return <any>d;
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }

        /** перевод числового времени в строковый */
        time(x: number): string {
            if (x === 0)
                return "00";
            if (x < 10)
                return "0" + x;
            else
                return x + "";
        }

        /** перевод строки в дату */
        stringToDate(dat: string): string {
            let arr = dat.split("-");
            return arr.map(y=> this.time(+y)).join("-") + "T00:00:00";
        }

        dateBirthdayStringify(unit: Unit): Unit {
            let temp_unit = _.cloneDeep(unit);

            if( unit.birthday.year && unit.birthday.mounth && unit.birthday.day)
                (<any>temp_unit.birthday) = unit.birthday.year + "_" + unit.birthday.mounth + "_" + unit.birthday.day;

            return temp_unit;
        }
        
        dateBirthdayParse(unit: Unit): Unit {
            let temp_unit = _.cloneDeep(unit);

            if( unit.birthday && (<string>unit.birthday).length > 0){
                let arr = (<string>unit.birthday).split("_");
                temp_unit.birthday = {
                    year: +arr[0],
                    mounth: +arr[1],
                    day: +arr[2]
                }
            }
                

            return temp_unit;
        }

    }
}