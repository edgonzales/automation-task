import { test, expect } from '@playwright/test';

// ~~~~~~~~ CONSTANTS ~~~~~~~~
const PRODUCT_NAME = [
  'shorts',
];

const QUANTITY = [1, 2, 3, 4, 5];

// Note to parametize, I would use https://playwright.dev/docs/test-parameterize

// ~~~~~~~~ TEST ~~~~~~~~
test('verifyAddToCartWorkflow - Socks', async ({ page }) => {

  const clothingDropDwn = page.getByRole('button', { name: 'Clothing' });
  const sideRefinePanelChampion = page.getByLabel('Side Refine Panel').getByRole('link', { name: 'Champion' });
  const itemTitles = page.locator('css=.s-item__title');
  const paginationItems = page.locator('css=.pagination__items li');
  const lastPaginationItem = page.getByRole('link', { name: '6' });

  // Go to URL, then assert that Chrome goes to the correct URL
  await page.goto('https://www.ebay.com/');
  await expect(page).toHaveURL(/.*ebay/);

  // navigate and search for Product Name
  await page.getByRole('link', { name: 'Brand Outlet' }).first().click();
  await page.waitForLoadState();

  await clothingDropDwn.click();
  await sideRefinePanelChampion.click();
  await page.getByPlaceholder('Search Up to 40% off Champion').click();
  await page.getByPlaceholder('Search Up to 40% off Champion').fill(PRODUCT_NAME[0]);
  await page.getByPlaceholder('Search Up to 40% off Champion').press('Enter');

  // nested for loop to include getting to the next page and checking that item
  // titles contain the product name
  for (const paginationItem of await paginationItems.all()) {
    await page.waitForLoadState();
    console.log('These are the pagination items: ', await paginationItem.innerText());
    for (const itemTitle of await itemTitles.all()) {
      const lowerCaseText = await itemTitle.innerText().then(text => text.toLowerCase());
      expect.soft(lowerCaseText).toContain(PRODUCT_NAME[0]);
    }
    await paginationItem.click();
  }

  await itemTitles.last().click();



  // add item to cart
  await page.getByTestId('x-atc-action').getByTestId('ux-call-to-action').click();
  await page.getByRole('link', { name: 'Go to cart' }).click();

  // grabs item price, removes the $, and converts it to a float
  const defaultItemPriceElm = await page.locator('css=.price-details').first().innerText();
  const defaultItemPriceStr = defaultItemPriceElm.replace("$", "");
  const defaultItemPriceFloat = parseFloat(defaultItemPriceStr);
  await page.waitForLoadState();

  // updates the quantity on the drop down to 5, in this example
  const quantityDropDown = page.locator('[data-test-id="list-summary"]').getByRole('combobox')
  await quantityDropDown.selectOption(QUANTITY[4].toString());

  // wait for 1.5 second
  await page.waitForTimeout(1500);
  // await quantityDropDown.waitFor('attached');
  // await page.waitForLoadState();

  // grab item price, removes the $, and converts it to a float
  const updatedItemPriceElm = await page.locator('css=.price-details').first().innerText();
  const updatedItemPriceStr = updatedItemPriceElm.replace("$", "");
  const updatedItemPriceFloat = parseFloat(updatedItemPriceStr);

  // assertion to confirm the math of when quantity is updated, the price is updated accordingly
  console.log(`The default item price is $${defaultItemPriceFloat}, and the updated item price is $${updatedItemPriceFloat}.`);
  expect(updatedItemPriceFloat).toBe(defaultItemPriceFloat * QUANTITY[4]);

  page.close()

});