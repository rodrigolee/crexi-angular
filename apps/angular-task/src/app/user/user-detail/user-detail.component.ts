import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
    selector: 'crx-user-detail',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss',
    standalone: true
})
export class UserDetailComponent implements OnInit {

    userService = inject(UserService);
    router = inject(Router); // Inject the Router service

    user = this.userService.selectedUser;

    @Input({ transform: numberAttribute })
    id = 0;

    ngOnInit (): void {

        if (this.id) {

            this.userService.setSelectedUserId(this.id);

        }

    }

    goBack (): void {

        this.router.navigate(['/users']);

    }

    toggleFavorite (): void {

        const user = this.user();
        if (user) {

            this.userService.toggleFavorite(user.id);

        }

    }

}
