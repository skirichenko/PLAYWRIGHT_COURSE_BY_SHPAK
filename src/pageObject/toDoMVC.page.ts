import { Page } from "@playwright/test"


export class ToDoMVCpage {

    constructor(readonly page: Page) {}

    async addItem(itemName: string) {
       const input =  await this.page.getByPlaceholder('What needs to be done?')
       await input.fill(itemName)
       await input.press('Enter')
    }

    async editItem(itemName: string) {
        await this.page.getByText(itemName).dblclick()
        await this.page.locator(`[value="${itemName}"]`).fill(itemName + '_edited')
        await this.page.getByRole('link', {name: 'All'}).click()
    }

    async checkItem(itemName: string) {
        await this.page.locator('li')
        .filter({ hasText: itemName }).getByLabel('Toggle Todo').check();
          }

    async isChecked(itemName: string) {
        return await this.page.locator('li')
        .filter({ hasText: itemName }).getByLabel('Toggle Todo').isChecked()
}

    async isVisible(itemName: string) {
        return await this.page.getByText(itemName, {exact: true}).isVisible()
    }

    async switchView(view: string) {
        await this.page.getByRole('link', {name: view}).click()
    }
}




