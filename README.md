# Automation Task

Runnable on: Windows OS

Browser: Chrome

Stack
- NodeJS
- Javascript
- Playwright automation

Instructions
- Download VS Code
- Download [VS Code plugin: Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- Press the 'Play' button
<img src="https://i.imgur.com/6YYdSYE.png">

Refactor Opportunities
- BUG! for loop is iterating through items that are not part of the results screen
- BUG! nested for loop gets stuck on the last page
- Some products do not increasing the quantity more than 3. Apply conditional logic to check for this.
- Parametize the automation using https://playwright.dev/docs/test-parameterize and https://www.npmjs.com/package/csv-parse
- Apply POM, creating pages and components