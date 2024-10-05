import { $, browser } from '@wdio/globals'

export async function navigateBrowser(): Promise<void> {
    it('TEST STEP: user navigates to base url', async () => {
        await browser.url(browser.options.baseUrl)
    })
    it('TEST STEP: user waits for header element', async () => {
        const header = await $('h1.heading').getElement()
        await header.waitForDisplayed()
    })
}