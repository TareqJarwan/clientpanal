import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService,
    ) { }

    canActivate(): boolean {
        if (this.settingsService.settings.allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}