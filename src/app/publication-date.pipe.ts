import * as moment from 'moment';
import 'moment/locale/es';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "PublicationDatePipe"
})

export class PublicationDatePipe implements PipeTransform{
    transform(fecha: number): String{
        return moment(fecha).fromNow();
    }
}
