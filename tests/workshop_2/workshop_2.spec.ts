import {expect, test} from "@playwright/test"


test.only('Automation form submittion', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/')
    
    const newTodo = await page.getByPlaceholder('What needs to be done?')

    //create multiple todo items
    await newTodo.fill('Xleb')
    await newTodo.press('Enter')
    await newTodo.fill('Miaso')
    await newTodo.press('Enter')
    await newTodo.fill('Mleko')
    await newTodo.press('Enter')

    //check 1st, 2nd, but do not check 3d
    const firstTodo = await page.getByTestId('todo-item').nth(0)
    await firstTodo.getByRole('checkbox').check();
    const secondTodo = await page.getByTestId('todo-item').nth(1)
    await secondTodo.getByRole('checkbox').check();
    const thirdTodo = await page.getByTestId('todo-item').nth(2)

    //ensure 1st and 2nd are displayed as completed, 3d is not completed 
    expect(await firstTodo).toHaveClass('completed')
    expect(await secondTodo).toHaveClass('completed')
    expect(await thirdTodo).not.toHaveClass('completed')

    //edit item, check visability with new name
    await page.getByText('Mleko').dblclick()
    await page.locator('[value="Mleko"]').fill('Mleko-edited')
    await page.getByRole('link', {name: 'All'}).click()

    expect(await page.getByText('Mleko', {exact: true})).not.toBeVisible()
    expect(await page.getByText('Xleb')).toBeVisible()
    expect(await page.getByText('Miaso')).toBeVisible()

    //only active items
    await page.getByRole('link', {name: 'Active'}).click()

    expect(await page.getByText('Mleko-edited', {exact: true})).toBeVisible()
    expect(await page.getByText('Xleb')).not.toBeVisible()
    expect(await page.getByText('Miaso')).not.toBeVisible()

    //only completed items
    await page.getByRole('link', {name: 'Completed'}).click()

    expect(await page.getByText('Mleko-edited', {exact: true})).not.toBeVisible()
    expect(await page.getByText('Xleb')).toBeVisible()
    expect(await page.getByText('Miaso')).toBeVisible()

    //clear completed   
    await page.locator('.clear-completed').click()
    await page.getByRole('link', {name: 'All'}).click()

    expect(await page.getByText('Mleko-edited', {exact: true})).toBeVisible()
    expect(await page.getByText('Xleb')).not.toBeVisible()
    expect(await page.getByText('Miaso')).not.toBeVisible()








})

