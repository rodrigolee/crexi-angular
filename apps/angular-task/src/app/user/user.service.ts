import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { User, UserApiResponse } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  constructor() {
    this.http.get<UserApiResponse[]>(this.usersUrl)
      .pipe(
        map(data =>
          data.map(user => ({
            ...user,
            address: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
            company: user.company.name,
            isFavorite: false
          }) as User)
        ),
        shareReplay(1)
      )
      .subscribe(users => this.users.set(users)); // Update writable signal
  }
  searchQuery = signal<string | null>(null);
  users = signal<User[]>([]);
  filteredUsers = computed(() => {
    const query = this.searchQuery();
    if (query) {
      return this.users().filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      )
    }
    return this.users();

  });
  // Signal for the selected user Id
  selectedUserId = signal<number | undefined>(undefined);

  // Reactive user id to get the selected user
  selectedUser = computed(() =>
    this.users().find(user => user.id === this.selectedUserId())
  );

  setSelectedUserId(id: number) {
    this.selectedUserId.set(id);
  }

  updateSearch(query: string | null) {
    this.searchQuery.set(query);
  }

  toggleFavorite(userId: number) {
    this.users.update(currentUsers =>
      currentUsers.map(user =>
        user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user
      )
    );
  }
}