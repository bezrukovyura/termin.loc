namespace Termin.Services {


    export class ConverterService {


        date(d: Date): string {
            if (!d || !d.getFullYear)
                return <any>d;
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }



    }
}