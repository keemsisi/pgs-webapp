import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MessageService } from 'primeng/api';
import { CacheService } from '../servies/cache.service';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
=======
>>>>>>> 3ef147db79ca826e40a81226191d60342b05183b

@Component({
  selector: 'app-login-credentials',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.css']
})
<<<<<<< HEAD



export class LoginCredentialsComponent implements OnInit {


  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService,
    private messageService: MessageService, private cacheService: CacheService, private router: Router) {

  }


  ngOnInit() {

  }


  private FORMINIT(){
    // this.loginForm =
=======
export class LoginCredentialsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
>>>>>>> 3ef147db79ca826e40a81226191d60342b05183b
  }

}
