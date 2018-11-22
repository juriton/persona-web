import {Component, OnInit} from '@angular/core';
import {UsersService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'persona-web';

  constructor( public usersService: UsersService) {
    this.usersService.getUsers().subscribe();
  }

  ngOnInit(): void {}

}
