import { SettingsService } from './../../services/settings.service';
import { Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;
  
  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalacneOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //show error
      this.flashMessage.show('Please Fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.addClient(value);
      // Show messages
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      //Redirect to Dashboard 
      this.router.navigate(['/']);

    }
  }

}
