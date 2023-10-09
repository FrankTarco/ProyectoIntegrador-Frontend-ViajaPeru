import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from 'src/app/security/token.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit{

  isLogged = false;
  nombreUsuario = "";

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router, private tokenService:TokenService) {}

  elementoActual:string = "";
  
  cambiarElemento(elemento:string){
    this.elementoActual = elemento;
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    localStorage.setItem("token","");
    this.router.navigate(['/']);
    
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete()|| '{}';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }
}
