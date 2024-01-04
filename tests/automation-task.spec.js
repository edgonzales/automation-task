import { test, expect } from '@playwright/test';

// ~~~~~~~~ CONSTANTS ~~~~~~~~
const PRODUCT_NAME = [
  'crocs',
];

const QUANTITY = [1, 2, 3, 4, 5];

// Note to parametize, I would use https://playwright.dev/docs/test-parameterize

// ~~~~~~~~ TEST ~~~~~~~~
test('verifyAddToCartWorkflow - Socks', async ({ page }) => {
  
  // Go to URL, then assert that Chrome goes to the correct URL
  await page.goto('https://www.ebay.com/');
  await expect(page).toHaveURL(/.*ebay/);
  
  // navigate and search for Product Name
  await page.getByRole('link', { name: 'Brand Outlet' }).first().click();
  await page.waitForLoadState();

  await page.getByRole('button', { name: 'Footwear' }).click();
  await page.getByRole('link', { name: 'Crocs', exact: true }).click();
  await page.getByPlaceholder('Search Up to 50% off Crocs').click();
  await page.getByPlaceholder('Search Up to 50% off Crocs').fill(PRODUCT_NAME[0]);
  await page.getByPlaceholder('Search Up to 50% off Crocs').press('Enter');
  
  // nested for loop to include getting to the next page and checking that item
  // titles contain the product name
  await page.waitForTimeout(1500);
  
  const paginationItems = page.locator('nav ol li .pagination__item');
  const itemTitles = page.locator('css=.s-item__title');
  
  for (const paginationItem of await paginationItems.all()) {
    await page.waitForLoadState();
    for (const itemTitle of await itemTitles.all()) {
      const lowerCaseText = await itemTitle.innerText().then(text => text.toLowerCase());
      expect.soft(lowerCaseText).toContain(PRODUCT_NAME[0]);
    }
    await page.waitForLoadState();
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
  await quantityDropDown.waitFor('attached');
  await page.waitForLoadState();

  // grab item price, removes the $, and converts it to a float
  const updatedItemPriceElm = await page.locator('css=.price-details').first().innerText();
  const updatedItemPriceStr = updatedItemPriceElm.replace("$", "");
  const updatedItemPriceFloat = parseFloat(updatedItemPriceStr);

  // assertion to confirm the math of when quantity is updated, the price is updated accordingly
  console.log(`The default item price is $${defaultItemPriceFloat}, and the updated item price is $${updatedItemPriceFloat}.`);
  expect(updatedItemPriceFloat).toBe(defaultItemPriceFloat * QUANTITY[4]);

  page.close()

});