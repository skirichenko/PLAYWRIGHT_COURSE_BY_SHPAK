import {expect, test} from "@playwright/test"

//

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

    //check 1st, 2nd, do not check 3d
    const firstTodo = await page.getByTestId('todo-item').nth(0)
    await firstTodo.getByRole('checkbox').check();

    const secondTodo = await page.getByTestId('todo-item').nth(1)
    await secondTodo.getByRole('checkbox').check();

    const thirdTodo = await page.getByTestId('todo-item').nth(2)

    //ensure 1st and 2nd are displayed as completed, 3d is not completed 
    await expect(firstTodo).toHaveClass('completed')
    await expect(secondTodo).toHaveClass('completed')
    await expect(thirdTodo).not.toHaveClass('completed')
   
    })
