import { test, expect } from "@playwright/test";

test.describe("Playwright Tests", () => {
    test("has title", async ({ page }) => {
        await page.goto("https://playwright.dev/");
        await expect(page).toHaveTitle(/Playwright/);
    });

    test("get started link", async ({ page }) => {
        await page.goto("https://playwright.dev/");
        await page.getByRole("link", { name: "Get started" }).click();
        await expect(page).toHaveURL(/.*intro/);
        await expect(page.locator("ul li a:has-text('How to install Playwright')")).toBeVisible();
    });
});

test.describe("Cypress Example ToDo Tests", () => {
    test("todo list has correct title", async ({ page }) => {
        await page.goto("https://example.cypress.io/todo");
        await expect(page.locator(".header h1")).toHaveText("todos");
    });

    test("new to-do input is visible with placeholder", async ({ page }) => {
        await page.goto("https://example.cypress.io/todo");
        const newToDo = page.locator("input.new-todo");
        await expect(newToDo).toBeVisible();
        await expect(newToDo).toHaveAttribute("placeholder", "What needs to be done?");
    });

    test("count of to-do items", async ({ page }) => {
        await page.goto("https://example.cypress.io/todo");
        const elements = page.locator("ul.todo-list li");
        await expect(elements).toHaveCount(2);
    });

    test("mark task as completed", async ({ page }) => {
        await page.goto("https://example.cypress.io/todo");
        const circle = page.locator("input.toggle").first();
        await circle.click();
        const firstElement = page.locator("ul.todo-list li").first();
        await expect(firstElement).toHaveClass(/completed/);
    });

    test("delete task", async ({ page }) => {
        await page.goto("https://example.cypress.io/todo");
        const firstElement = page.locator("ul.todo-list li").first();
        const closeButton = firstElement.locator("button.destroy");
        await closeButton.click();
        await expect(firstElement).toBeHidden();
    });
});

test.describe("OpenWeather Tests", () => {
    test("check guide heading", async ({ page }) => {
        await page.goto("https://openweathermap.org");
        await page.getByRole("link", { name: "Guide" }).click();
        await expect(page.getByRole("heading", { name: "Guide" })).toBeVisible();
        await expect(page).toHaveURL(/.*guide/);
    });
});

test.describe("Login Tests", () => {
    test("login form submission", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await page.getByRole("textbox", { name: "username" }).fill("tomsmith");
        await page.getByRole("textbox", { name: "password" }).fill("SuperSecretPassword!");
        await page.getByRole("button", { name: "Login" }).click();
        
        await expect(page.getByText('You logged into a secure area!')).toBeVisible();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    });
    test('checkbox', async ({page}) => {
        await page.goto('https://home.openweathermap.org/users/sign_in');
        await page.getByRole('checkbox', {name: 'Remember me'}).check();
        await expect(page.getByRole('checkbox', {name: 'Remember me'})).toBeChecked();
    });
    test('radiobutton', async ({page}) => {
        await page.goto('https://home.openweathermap.org/questions');
        await page.getByLabel('Yes').check();
        await expect(page.getByLabel('Yes')).toBeChecked();
    });
    test('demoqa checkbox', async ({page}) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        // const checkbox = page.getByRole('checkbox', {name: 'Sports'});
        // await checkbox.check({force:true})
        await page.getByText('Sports', {exact:true}).check();
    });
    test('hover', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/hovers');
        await page.getByAltText('User Avatar').first().hover();
        await expect(page.getByText('name: user1')).toBeVisible();
    });
    test('.textContent(), .innerText()', async ({page}) =>{
        await page.goto('https://demoqa.com/automation-practice-form');
        // const text = await page.locator('h1.text-center').textContent();
        const text = await page.locator('h1.text-center').innerText();
        console.log(text)
    });
    test('uncheck', async ({page}) => {
        await page.goto('https://home.openweathermap.org/questions');
        await page.getByLabel('Yes').check();
        await page.getByLabel('No').check();
        // await page.getByLabel('No').uncheck();
        await expect(page.getByLabel('Yes')).not.toBeChecked();

    });
    test('list items', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
        const items = page.getByRole('listitem');
        console.log(await items.all());
        console.log(await items.allInnerTexts());
        await items.filter({hasText: 'Home'}).click();
    });
    test('dropdown', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/dropdown');
        const selectMenu = page.locator('#dropdown');
        await selectMenu.selectOption('Option 1');
        await expect(selectMenu).toHaveValue('1');
        await expect(selectMenu.locator('option:checked')).toHaveText('Option 1');
        await expect(selectMenu.getByText('Option 1')).toHaveAttribute('selected', 'selected');
    });
    test('multiselect', async ({page}) => {
       await page.goto('https://demoqa.com/select-menu');
       await page.getByText('Select...').click();
       await page.locator('#react-select-4-option-0').click();
       await page.locator('#react-select-4-option-1').click();
       await expect(page.locator('.css-1rhbuit-multiValue')).toHaveText(['Green','Blue']);
    });
});