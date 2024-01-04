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

Enhancements
- Simplify the intro steps to make it easier to parametize
- Parametize the automation using https://playwright.dev/docs/test-parameterize and https://www.npmjs.com/package/csv-parse
- Apply POM, creating pages and components

Bugs
- Nested for-loop is iterating through items that are not part of the results screen
- Some products do not allow the increase in quantity by more than 1. Apply conditional logic to check for this.