import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

jest.mock('../user.service');

describe('UserListComponent', () => {

    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let userServiceMock: jest.Mocked<UserService>;

    beforeEach(async () => {

        userServiceMock = new UserService() as jest.Mocked<UserService>;
        userServiceMock.updateSearch = jest.fn();
        userServiceMock.toggleFavorite = jest.fn();

        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatButtonModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                UserListComponent,
            ],
            providers: [{ provide: UserService, useValue: userServiceMock }],
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;

    });

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should call toggleFavorite when toggling a favorite user', () => {

        component.toggleFavorite(1);

        expect(userServiceMock.toggleFavorite).toHaveBeenCalledWith(1);

    });

    it('should clean up subscriptions on destroy', () => {

        const nextSpy = jest.spyOn(component['destroy$'], 'next');
        const completeSpy = jest.spyOn(component['destroy$'], 'complete');

        component.ngOnDestroy();

        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();

    });

});
