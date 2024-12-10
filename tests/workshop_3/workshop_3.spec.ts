import { test, expect } from '@playwright/test'

test('Advanced interaction', async({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_3/index.html')
    await page.locator('#hover-me').hover()
    expect( await page.locator('#hover-me')).toHaveText('Text Changed!')
    
    await page.locator('#context-menu').click({button: 'right'})
    expect( await page.getByText('Context Menu Appears!')).toBeVisible()
    
    await page.locator('#double-click').dblclick()
    //expect(await page.getByText('Cute cat')).toBeVisible()
    expect(await page.getByAltText('Cute Cat').count()).toBe(1)

})
