import { test, expect } from '@playwright/test'

test('Handling Alert', async({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_4/index.html')
    //await page.locator('#show-alert').click()
    let alertMessage = ''
page.on('dialog', async(dialog) => {
    expect(dialog.type()).toBe('alert');
    alertMessage = await dialog.message()
    await dialog.accept()
})
await page.click('#show-alert')
expect(alertMessage).toBe('This is a simple alert.')
})

test('Confirm Alert', async({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_4/index.html')
    
})