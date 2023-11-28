import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navMenu = [
    {name:"Inicio", link:"/"},
    {name:"Alumnos", link:"/students"},
    {name:"Asignaturas", link:"/subjects"},
   ];

   isVisible = false

   activeLink='';

   activeNav(link){
     this.activeLink=link
   } 
}
