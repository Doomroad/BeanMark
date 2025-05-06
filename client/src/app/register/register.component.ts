import { Component, inject, input, NgModule, output} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  imports: [BrowserModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountsService);
  cancelRegister = output<boolean>();
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
