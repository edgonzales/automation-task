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
- Parametize the automation using https://playwright.dev/docs/test-parameterize and https://www.npmjs.com/package/csv-parse
- Some products do not increasing the quantity more than 3. Apply conditional logic to check for this.
- Apply POM, creating pages and components
- Fix the for loop bug where the soft assertion stops the test from running
