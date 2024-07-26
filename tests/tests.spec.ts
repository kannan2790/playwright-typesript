import { test, expect } from '@playwright/test';
import Main from '../pages/mainpage'
import Register from '../pages/register';
import { randomInt } from 'crypto';
import exp from 'constants';

const url = "https://parabank.parasoft.com/parabank/index.htm"
const username = "pirate".concat(randomInt(1,100000).toString())

test.beforeEach(async({page}) => {
    const main = new Main(page)
    await main.gotourl(url)
})
test('Register new-user', async({page}) =>{
    const register = new Register(page)
    const main = new Main(page)
    await main.click_to_register()
    await register.register_new_user(username)
    await register.validate_new_user(username)

})
test('Successful login', async({page}) =>{
    const login = new Main(page)
    await login.enterlogininfo(username,"Test1234")
    expect (await page.getByText("Welcome to Account Services")).toBeVisible
    expect(await page.screenshot()).toMatchSnapshot('Successful-login.png',{maxDiffPixelRatio:0.02});
})
test('Unsuccessful login', async({page})=>{
    const main = new Main(page)
    const login = new Main(page)
    await login.enterlogininfo("dontexists","dfsdf")
    expect (await page.getByText("The username and password could not be verified.")).toBeVisible
    expect(await page.screenshot()).toMatchSnapshot('Unsuccessful login.png',{maxDiffPixelRatio:0.02});
})