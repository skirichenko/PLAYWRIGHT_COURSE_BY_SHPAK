import { test } from '@playwright/test';

test('Basic Navigation', async({page}) => {
    await page.goto('https://gitlab.com/')
    await page.waitForTimeout(3000)
    await page.reload() 
})

test('Interaction with Web Element on Git', async({page}) => {
    await page.goto('https://gitlab.com/')
    await page.click('#onetrust-accept-btn-handler')
    await page.locator('#be-navigation-desktop').getByRole('link', { name: 'Get free trial' }).click();
    // await page.locator('[data-testid="new-user-first-name-field"]').fill('John001')
    // await page.locator('[data-testid="new-user-last-name-field"]').fill('Snow001')
    await page.getByTestId('new-user-first-name-field').fill('John002')
    await page.getByTestId('new-user-last-name-field').fill('Snow002')

})

test.only('Using various locator methods', async({page}) => {
    await page.goto('https://gitlab.com/')
    await page.click('#onetrust-accept-btn-handler')
    //await page.getByRole('button', {'name': 'Main menu'}).click()
    await page.getByRole('link', {'name': 'Sign in'}).click()

    await page.waitForTimeout(3000)
})
