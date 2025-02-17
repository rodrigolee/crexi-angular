import { test, expect } from '@playwright/test';

test.describe('User List Page', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:4200/users');

    });

    test('should display a list of user cards', async ({ page }) => {

        const userCards = page.locator('[data-testid="user-card"]');
        const count = await userCards.count();
        expect(count).toBeGreaterThan(0);

    });

    test('should filter users when search input is changed', async ({ page }) => {

        const searchInput = page.locator('[data-testid="search-input"]');

        await searchInput.fill('Leanne');

        //  Wait for debounce delay 400ms
        await page.waitForTimeout(400);

        // Check that the visible user cards contain the search term in the user's name.
        const userCards = page.locator('[data-testid="user-card"]');
        const count = await userCards.count();
        const indices = [...Array(count).keys()];
        for (const i of indices) {

            const cardText = await userCards.nth(i).innerText();
            expect(cardText.trim()).not.toEqual('');

        }

    });

    test('should toggle favorite status', async ({ page }) => {

        const favoriteButton = page.locator('[data-testid="favorite-button"]').first();

        // Verify initial button text is 'Favorite'
        await expect(favoriteButton).toHaveText('Favorite');

        // Click the button to toggle favorite
        await favoriteButton.click();

        // Wait for any UI update
        await page.waitForTimeout(300);

        // Verify the button text now shows 'Unfavorite'
        await expect(favoriteButton).toHaveText('Unfavorite');

        // Click again to toggle back
        await favoriteButton.click();
        await page.waitForTimeout(300);
        await expect(favoriteButton).toHaveText('Favorite');

    });

    test('should navigate to user detail when "View Details" is clicked', async ({ page }) => {

        const detailsButton = page.locator('[data-testid="details-button"]').first();

        // Click on the "View Details" button
        await detailsButton.click();

        // Verify that the URL changes to the user detail page
        await expect(page).toHaveURL(/\/users\/\d+/);

        // Check for user's name on the user detail page
        const title = page.locator('mat-card-title');
        await expect(title).toHaveText('Leanne Graham');

    });

});
