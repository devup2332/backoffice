import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit {
  titleMessage: string = 'Error de autenticacion';
  contentMessage: string = 'No es posible auntenticar por falta de red';
  open: boolean = false 

  constructor() {}

  ngOnInit(): void {}

  closeAlert() {
    this.open = false
  }
}
