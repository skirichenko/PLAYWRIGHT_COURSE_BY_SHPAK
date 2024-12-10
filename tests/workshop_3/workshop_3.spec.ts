import { test, expect } from '@playwright/test'

test.only('Advanced interaction', async({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_3/index.html')
    await page.locator('#hover-me').hover()
    expect( await page.locator('#hover-me')).toHaveText('Text Changed!')
   
})
