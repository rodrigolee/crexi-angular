import { test, expect } from '@playwright/test';

test.describe('UserDetailComponent', () => {

    const id = 1;

    // Mock API response for user details
    const mockUser = {
        id,
        name: 'Leanne Graham',
        isFavorite: false,
    };

    test.beforeEach(async ({ page }) => {

        // Navigate to the user detail page with a mock user id
        await page.goto(`/users/${id}`);

    });

    test('should display user details correctly', async ({ page }) => {

        // Verify user name is displayed
        await expect(page.locator('mat-card-title')).toHaveText(mockUser.name);

        // Verify favorite button state
        const favoriteButton = page.locator('button[data-testid="favorite-button"]');
        await expect(favoriteButton).toHaveText('Favorite'); // Not favorited

    });

    test('should toggle favorite status', async ({ page }) => {

        const favoriteButton = page.locator('button[data-testid="favorite-button"]');

        // Initially, the user should not be a favorite
        await expect(favoriteButton).toHaveText('Favorite');

        // Click to toggle favorite status
        await favoriteButton.click();
        await expect(favoriteButton).toHaveText('Unfavorite', { timeout: 5000 });

        // Click again to unfavorite
        await favoriteButton.click();
        await expect(favoriteButton).toHaveText('Favorite'); // Back to not favorited

    });

    test('should navigate back to user list', async ({ page }) => {

        // Click the back button
        await page.click('button[data-testid="back-button"]');
        await page.waitForURL('**/users');

        // Verify navigation to the user list page
        await expect(page).toHaveURL('/users');

    });

});
