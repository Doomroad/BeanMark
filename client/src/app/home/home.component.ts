import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RegisterComponent, CommonModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private accountService = inject(AccountsService);

  user = this.accountService.currentUser;
  isLoggedIn = computed(() => !!this.user());

  // Set registerMode based on login status
  registerMode = signal(!this.isLoggedIn());

  // Toggle register form manually (e.g., from button click)
  registerToggle() {
    this.registerMode.set(!this.registerMode());
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode.set(event);
  }
}
