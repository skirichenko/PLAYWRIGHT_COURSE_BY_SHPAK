import {expect, type Page, test} from "@playwright/test";
import { ToDoMVCpage } from "../../src/pageObject/toDoMVC.page";


test.describe.configure({ mode: 'serial' });

let page: Page;
let toDoMVCpage: ToDoMVCpage;


test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  toDoMVCpage = new ToDoMVCpage(page);
  await page.goto('https://demo.playwright.dev/todomvc/')

  await toDoMVCpage.addItem('Xleb')
  await toDoMVCpage.addItem('Mleko')
  await toDoMVCpage.addItem('Woda')
});

test('Todo item can be edited', async ({}) => {

    //edit item, check visability with new name
    await toDoMVCpage.editItem('Mleko') 

    expect(await toDoMVCpage.isVisible('Xleb')).toEqual(true)
    expect(await toDoMVCpage.isVisible('Woda')).toEqual(true)
    expect(await toDoMVCpage.isVisible('Mleko_edited')).toEqual(true)
    expect(await toDoMVCpage.isVisible('Mleko')).toEqual(false)
})

test('Todo item can be checked (completed)', async ({}) => {
    
    //check 1st, 3d, but do not check 2nd
    await toDoMVCpage.checkItem('Xleb')
    await toDoMVCpage.checkItem('Woda')

    //ensure 1st and 3d are displayed as completed, 2nd is not completed 
    expect(await toDoMVCpage.isChecked('Xleb')).toEqual(true)
    expect(await toDoMVCpage.isChecked('Woda')).toEqual(true)
    expect(await toDoMVCpage.isChecked('Mleko')).toEqual(false)
    
})

test('Only active items', async ({}) => {


    //only active items
    await toDoMVCpage.switchView('Active')

    expect(await toDoMVCpage.isVisible('Xleb')).toEqual(false)
    expect(await toDoMVCpage.isVisible('Woda')).toEqual(false)
    expect(await toDoMVCpage.isVisible('Mleko_edited')).toEqual(true)
})

test('Only completed items', async ({}) => {

    //only completed items
    await toDoMVCpage.switchView('Completed')

    expect(await toDoMVCpage.isVisible('Xleb')).toEqual(true)
    expect(await toDoMVCpage.isVisible('Woda')).toEqual(true)
    expect(await toDoMVCpage.isVisible('Mleko_edited')).toEqual(false)
})
    
test('Clear completed', async ({}) => {

//clear completed   
    await page.locator('.clear-completed').click()
    await toDoMVCpage.switchView('All')

    expect(await toDoMVCpage.isVisible('Xleb')).toEqual(false)
    expect(await toDoMVCpage.isVisible('Woda')).toEqual(false)
    expect(await toDoMVCpage.isVisible('Mleko_edited')).toEqual(true)

})
    
test.afterAll(async () => {
    await page.close();
  });
