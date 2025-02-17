import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'crx-user-list',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true
})
export class UserListComponent implements OnInit, OnDestroy {

    private userService = inject(UserService);
    private destroy$ = new Subject<void>();

    filteredUsers = this.userService.filteredUsers;
    searchQuery = new FormControl('');

    toggleFavorite (userId: number): void {

        if (userId) {

            this.userService.toggleFavorite(userId);

        }

    }

    ngOnInit () {

        this.searchQuery.valueChanges.pipe(
            debounceTime(300), // Debounce for 300 milliseconds
            takeUntil(this.destroy$)
        ).subscribe((value) => {

            this.userService.updateSearch(value);

        });

    }

    ngOnDestroy () {

        this.destroy$.next();
        this.destroy$.complete();

    }

}
