import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { LoginUsuario } from 'src/app/security/login-usuario';
import { TokenService } from 'src/app/security/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-login',
  templateUrl: './add-login.component.html',
  styleUrls: ['./add-login.component.css']
})
export class AddLoginComponent implements OnInit{

public myForm!:FormGroup;


  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb:FormBuilder
  ) {
    console.log("constructor >> constructor >>> " + this.tokenService.getToken());
   }

  ngOnInit() {

    this.myForm = this.createMyFrom();


    if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
   }

  }

  private createMyFrom():FormGroup{

    return this.fb.group({
      usuario:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }




  onLogin(): void {
if (this.myForm.invalid){
  Swal.fire({
    icon: 'info',
    title: 'Ingrese Datos',
    text: "Usuario y Contraseña Obligatorios",
  })
}else{




    this.authService.login(this.loginUsuario).subscribe(
      (data:any) => {
          this.isLogged = true;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.login);
          this.tokenService.setUserNameComplete(data.nombreCompleto)
          this.tokenService.setAuthorities(data.authorities);
          this.tokenService.setUserId(data.idUsuario);
          this.tokenService.setOpciones(data.opciones);

          this.roles = data.authorities;
          this.router.navigate(['/app']);

          localStorage.setItem('token',this.tokenService.getToken());
          console.log("onLogin() >> setUserName >>> " +  this.tokenService.getUserName());
          console.log("onLogin() >> setUserNameComplete >>> " +  this.tokenService.getUserNameComplete());
          console.log("onLogin() >> idUsuario >>> " +  this.tokenService.getUserId());
          console.log("onLogin() >> roles >>> " +  this.tokenService.getAuthorities());
          console.log("onLogin() >> opciones >>> INICIO >> " );
          this.tokenService.getOpciones().forEach(obj => {
            console.log(" >> onLogin() >> " +  obj.nombre ); 
          });
          console.log("onLogin() >> opciones >>> FIN >> " );
      },
      (err:any) => {
          this.isLogged = false;
          this.errMsj = err.message;
          console.log(err);
          if (err.status == 401){
    
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Usuario no Autorizado",
              })

          }
      }
    );
  }

  }

}
