import { $, $$, browser, expect } from '@wdio/globals'
import { navigateBrowser } from './navigateBrowser'

describe('TEST SUITE: User interactions', () => {
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

  describe('TEST CASE: user should be able to use inputs', () => {
    const inputValue: string = '12344321'

    navigateBrowser()

    it('TEST STEP: user selects input field', async () => {
      const inputLink = await $('a=Inputs').getElement()
      await inputLink.click()
      await (await getHeader()).waitForDisplayed()
    })
    it('TEST STEP: user fills input field', async () => {
      await (await getInputField()).setValue(inputValue)
    })
    it(`TEST STEP: verify input field contains ${inputValue}`, async () => {
      await expect(await getInputField()).toHaveValue(inputValue)
    })
  })

  describe('TEST CASE: user should pick from dropdown menu (fails by design to gen video)', () => {
    const dropDownOption: number = 2
    const dropDownValue: string = 'Option 1'

    navigateBrowser()

    it('TEST STEP: user selects link to dropdown', async () => {
      const inputLink = await $('a=Dropdown').getElement()
      await inputLink.click()
      await (await getHeader()).waitForDisplayed()
    })
    it('TEST STEP: user selects dropdown', async () => {
      const dropDown = await $('select#dropdown').getElement()
      await (await getDropDown()).click()
    })
    it(`TEST STEP: user selects dropdown option ${dropDownOption}`, async () => {
      const dropDownOptions = await $$('option').getElements()
      await dropDownOptions[dropDownOption].click()
    })
    it(`TEST STEP: verify dropdown option ${dropDownValue}`, async () => {
      await expect(await getDropDown()).toHaveValue(dropDownValue)
    })
  })

  describe('TEST CASE: user should scroll a lot (fails by design to gen video)', () => {
    const elementCount: number = 1

    navigateBrowser()

    it('TEST STEP: user selects link to scroll', async() => {
      const inputLink = await $('a=Infinite Scroll').getElement()
      await inputLink.click()
      await (await getHeader()).waitForDisplayed()
    })
    it('TEST STEP: user selects paragraph to scroll', async() => {
      for (let index = 0; index < 5; index++) {
        const paragraphs = await getScrolledParagraph()
        const lastParagraph = paragraphs[paragraphs.length - 1]
        await lastParagraph.scrollIntoView(true)
        await lastParagraph.click()
        await browser.pause(1000)
      }
    })
    it(`TEST STEP: verify scrolled elements count is ${elementCount}`, async() => {
      await expect(await getScrolledParagraph()).toBeElementsArrayOfSize(elementCount)
    })
  })
})