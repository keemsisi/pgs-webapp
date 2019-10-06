import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup ; 
  constructor(private fb : FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      username : new FormControl( "", [ Validators.required]),
      password : new FormControl( "", [ Validators.required]),
      confirmPassword : new FormControl( "", [Validators.required])
    })
   }

  ngOnInit() {
  }

  public registerNewAccount(){
    this.router.navigate(['/cv-documentation']).catch(function(reason){
      console.table(reason);
    })
  }

}
