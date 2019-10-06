import { from, interval, fromEvent, of } from "rxjs";
import {ajax} from "rxjs/ajax";
import { map , retry , filter, catchError } from 'rxjs/operators';



const data  = from(fetch("/api/data/mapp.json"));
const data1 = interval(2000);
const data2 = ajax("api/data").pipe(
    retry(4),
    filter(req=> req.response != null || typeof req.response === 'string'),
    map(request=> {
        return request.response
    }),
    catchError(error=> of([]))
)



data2.subscribe(data=>{
    console.log(data.response);
    console.log(data.responseType);
    console.log(data.xhr.open("GET" , "https://neuraltechx.com/api/data/?name=cluster"))
})

