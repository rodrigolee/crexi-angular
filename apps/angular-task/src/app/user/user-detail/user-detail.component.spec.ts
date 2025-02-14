import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../user.service';
import { signal } from '@angular/core';

describe('UserDetailComponent', () => {

    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;
    let userService: UserService;

    beforeEach(async () => {

        // Mocking UserService
        const userServiceMock = {
            setSelectedUserId: jest.fn(),
            toggleFavorite: jest.fn(),
            selectedUser: signal({ id: 1, name: 'Test User' })
        };

        await TestBed.configureTestingModule({
            imports: [UserDetailComponent],
            providers: [
                { provide: UserService, useValue: userServiceMock }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService); // Inject the mocked service
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should toggle favorite status', () => {

        component.toggleFavorite();
        expect(userService.toggleFavorite).toHaveBeenCalledWith(1);

    });

});
