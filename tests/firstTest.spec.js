import { test, expect } from "@playwright/test";
import image from "../tests/testData.json";
import { faker } from '@faker-js/faker';

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

test.describe('Practice form', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://demoqa.com/automation-practice-form')
    });

    test('Validate First Name', async ({page}) => {
        const FirtsNameValue = 'Evgenia';
        const FirstNameLocator = page.getByPlaceholder('First Name');

        await page.goto('https://demoqa.com/automation-practice-form');
        await FirstNameLocator.fill(FirtsNameValue);
        await expect(FirstNameLocator).toHaveValue(FirtsNameValue);
    });
    test('Validate Last Name', async ({page}) => {
        const LastNameValue = 'Makarevich';
        const LastNameLocator = page.getByRole('textbox', {name :'Last Name'});

        await page.goto('https://demoqa.com/automation-practice-form');
        await LastNameLocator.fill(LastNameValue);
        await expect(LastNameLocator).toHaveValue(LastNameValue);
    });
    test('Validate First Name error', async({page}) => {
        await page.getByRole('button', {name: 'Submit'}).click();
        await expect(page.getByPlaceholder('First Name')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        });
        test('Validate Email', async({page}) => {
            await page.getByTestId('userEmail').fill('evgenia.al.makarevich@gmail.com');
            await expect(page.getByTestId('userEmail')).toHaveValue('evgenia.al.makarevich@gmail.com');
            });

        test('Validate Email', async({page}) => {
            await page.getByTestId('userEmail').fill('evgenia.al.makarevich@gmail.com');
            await expect(page.getByTestId('userEmail')).toHaveValue('evgenia.al.makarevich@gmail.com');
            });
        test('Validate Gender', async({page}) => {
            // await page.locator('#gender-radio-1').click();
            await page.getByText('Male', {exact: true}).click();
            });
        
});
test.describe('Second 11 lesson practice', () => {
    test('check checkbox', async ({page}) => {
        await page.goto('https://example.cypress.io/todo');
        const firstCheckbox = page.locator('.toggle').first();
        const lastCheckbox = page.locator('.toggle').last();
        const TodoList = page.locator('.todo-list li');
        const ToDoTexts = page.locator('.todo-list label')

        await firstCheckbox.check();
        await lastCheckbox.check();

        await expect(firstCheckbox).toBeChecked();
        await expect(lastCheckbox).toBeChecked();
        await expect(TodoList.first()).toHaveClass('completed');
        await expect(ToDoTexts.first()).toHaveCSS('color', 'rgb(205, 205, 205)');
        await expect(ToDoTexts.first()).toHaveCSS('text-decoration', /line-through/);
        await expect(ToDoTexts.first()).toHaveCSS('background-image', image.bgimage);
    });
    test('drop-down menu' , async ({page}) => {
        await page.goto('https://example.cypress.io/todo');
        const dropdownItems =page.locator('.dropdown-menu li');
        const dropdownItems10 =page.locator('.dropdown-menu li').nth(10);
        await expect(dropdownItems).toHaveCount(17);
        const expectedList = [
            'Querying',              'Traversal',
            'Actions',               'Window',
            'Viewport',              'Location',
            'Navigation',            'Assertions',
            'Misc',                  'Connectors',
            'Aliasing',              'Waiting',
            'Network Requests',      'Files',
            'Storage',               'Cookies',
            'Spies, Stubs & Clocks'
          ]
        console.log(await dropdownItems.allInnerTexts());
        console.log(await dropdownItems10.innerText());
        const DropdownListText = await dropdownItems.allInnerTexts();
        await expect(dropdownItems).toHaveText(expectedList);
        expect(DropdownListText).toEqual(expectedList);
        expect(dropdownItems10).toHaveText('Aliasing');
    });
    test('webtable.visible title', async ({page}) => {
        await page.goto('https://demoqa.com/webtables');
        const title = page.getByRole('heading' , {name: 'Web Tables'});
        await expect(title).toBeVisible();
        const rows = page.locator('.rt-tbody > div');
        expect(await rows.count()).toBe(10);
        await expect(rows).toHaveCount(10);


    });
    test('add new user', async ({page}) => {
        await page.goto('https://demoqa.com/webtables');
        await page.locator('#addNewRecordButton').click();
        await page.locator('#firstName').fill('Test Name');
        await page.locator('#lastName').fill('Last Name');
        await page.locator('#userEmail').fill('evgenia.makarevich@gmail.com');
        await page.locator('#age').fill('24');
        await page.locator('#salary').fill('24');
        await page.locator('#department').fill('QA');
        await page.getByRole('button', {name :'Submit'}).click();
        const rows = page.locator('.rt-tbody > div');
        // const isUserAdded = await rows.locator(':has-text("Test Name")').count() > 0;
        // expect(isUserAdded).toBeTruthy();
        // await expect(rows).toContainText('Test Name');
        const numberItems = await rows.count();
        let isFound = false;
        for(let i = 0; i < numberItems; i++){
            const rowsText = await rows.nth(i).innerText();
            if(rowsText.includes('Test Name')){
                isFound = true;
                break;
            }
        }
        expect(isFound).toBeTruthy();
    });
    test('add new 7 users and validate active "next" button ', async ({page}) => {
        async function addNewUser(){
            await page.locator('#addNewRecordButton').click();
            await page.locator('#firstName').fill(faker.name.firstName());
            await page.locator('#lastName').fill(faker.name.lastName());
            await page.locator('#userEmail').fill(faker.internet.email());
            await page.locator('#age').fill('24');
            await page.locator('#salary').fill('24');
            await page.locator('#department').fill('QA');
            await page.getByRole('button', {name :'Submit'}).click();
        };
        await page.goto('https://demoqa.com/webtables');

        for(let i = 0; i < 8; i++){
            await addNewUser();
        };
        const nextButton = page.getByRole('button', {name: 'Next'});
        expect(nextButton).toBeEnabled();

    })
});

test.describe('Lesson 12.1, lesson practice', () => {
    test('open page in a new tab', async ({page})=> {
         await page.goto('https://openweathermap.org/');
         const pageMarketPlacePromise = page.waitForEvent('popup');
         await page.getByText('Marketplace').first().click();
         const pageMarket = await pageMarketPlacePromise;
         await expect(pageMarket.getByRole('heading', {name: 'Custom Weather Products'})).toBeVisible();
         await expect(pageMarket).toHaveURL('https://home.openweathermap.org/marketplace');
    });
    test('using waitFor()', async ({page}) =>{
        await page.goto('https://openweathermap.org/');
        await page.getByPlaceholder('Search city').fill('New York');
        await page.getByRole('button', {name: 'Search'}).click();
        const droprownMenu = page.locator('ul.search-dropdown-menu');
        await droprownMenu.waitFor({state:'attached'});
        // await expect(page.locator('ul.search-dropdown-menu')).toBeVisible();
        // await page.getByText('New York City, US').click();
        // await expect(page.getByRole('heading', {name:'New York City, US'})).toBeVisible();
        await expect(droprownMenu.locator('li > span:nth-child(1)')).toHaveText(['New York City, US', 'New York, US']);

    });
    test('using alternative timeouts', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/dynamic_loading');
        await page.getByText('Example 1').click();
        await page.getByRole('button', {name: 'Start'}).click();
        // await page.getByRole('heading', {name: 'Hello World!'}).waitFor()
        await expect(page.getByRole('heading', {name: 'Hello World!'})).toBeVisible({timeout: 6000});
    });


});

