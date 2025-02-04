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

test('Drag-Drop', async({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_3/index.html')
    await page.dragAndDrop( '.drag-source', '.drop-target');
    expect (await page.textContent('.drop-target')).toContain('Success'    )
    await page.reload()
})

test('Drag-Drop2', async ({page}) => {
    await page.goto('file:///Users/svitlana/Playwright%20course%20by%20Shpak/tests/workshop_3/index.html')
    await page.locator('.drag-source').hover()
    await page.mouse.down()
    await page.locator('.drop-target').hover()
    await page.mouse.up()
    expect(await page.textContent('.drop-target')).toContain('Success')
    await page.reload()

})

