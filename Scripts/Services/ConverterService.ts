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

    }
}