import { Given, When, Then } from '@wdio/cucumber-framework'
import { $, $$, browser, expect } from '@wdio/globals'

async function getHeader() {
  return await $('h3').getElement()
}

async function getInputField() {
  return await $('input').getElement()
}

async function getDropDown() {
  return await $('select#dropdown').getElement()
}

async function getScrolledParagraph() {
  return await $$('div.jscroll-added').getElements()
}

Given('user navigates to base url', async (): Promise<void> => {
  await browser.url(browser.options.baseUrl)
  const header = await $('h1.heading').getElement()
  await header.waitForDisplayed()
})

When('user selects input field', async (): Promise<void> => {
  const inputLink = await $('a=Inputs').getElement()
  await inputLink.click()
  await (await getHeader()).waitForDisplayed()
})

When('user fills input field {string}', async (inputValue: string): Promise<void> => {
  await (await getInputField()).setValue(inputValue)
})

Then('verify input field contains {string}', async (inputValue: string): Promise<void> => {
  await expect(await getInputField()).toHaveValue(inputValue)
})

When('user selects link to dropdown', async (): Promise<void> => {
  const inputLink = await $('a=Dropdown').getElement()
  await inputLink.click()
  await (await getHeader()).waitForDisplayed()
})

When('user selects dropdown', async (): Promise<void> => {
  await (await getDropDown()).click()
})

When('user selects dropdown option {int}', async (dropdownOption: number): Promise<void> => {
  const dropDownOptions = await $$('option').getElements()
  await dropDownOptions[dropdownOption].click()
})

Then('verify dropdown option {string}', async (dropDownValue: string): Promise<void> => {
  await expect(await getDropDown()).toHaveValue(dropDownValue)
})

When('user selects link to scroll', async (): Promise<void> => {
  const inputLink = await $('a=Infinite Scroll').getElement()
  await inputLink.click()
  await (await getHeader()).waitForDisplayed()
})

When('user selects paragraph to scroll', async (): Promise<void> => {
  for (let index = 0; index < 5; index++) {
    const paragraphs = await getScrolledParagraph()
    const lastParagraph = paragraphs[paragraphs.length - 1]
    await lastParagraph.scrollIntoView(true)
    await lastParagraph.click()
    await browser.pause(1000)
  }
})

Then('verify scrolled elements count is {int}', async (elementCount: number): Promise<void> => {
  await expect(await getScrolledParagraph()).toBeElementsArrayOfSize(elementCount)
})
