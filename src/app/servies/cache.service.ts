import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  username: string ;
  password: string ;
  loggedIn: boolean;
  registered: boolean ;
  serverURL = 'http://localhost:8081';
<<<<<<< HEAD
  payloadData: string ;
=======
>>>>>>> 3ef147db79ca826e40a81226191d60342b05183b

  constructor() { }
}
