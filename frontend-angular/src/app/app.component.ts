import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend-angular';

  public profile?: KeycloakProfile;

  constructor(protected keycloakService: KeycloakService) {}

  async ngOnInit() {
    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (isLoggedIn) {
        this.profile = await this.keycloakService.loadUserProfile();
      }
    } catch (err) {
      console.error('Failed to load Keycloak user profile', err);
    }
  }

  async handleLogin() {
    try {
      await this.keycloakService.login({
        redirectUri: window.location.origin,
      });
    } catch (err) {
      console.error('Login failed', err);
    }
  }

  async handleLogout() {
    try {
      await this.keycloakService.logout(window.location.origin);
    } catch (err) {
      console.error('Logout failed', err);
    }
  }
}
