import { test, expect } from '@playwright/test';
import Main from '../pages/mainpage'
import Register from '../pages/register';
import UpdateProfile from '../pages/updateprofile';
import UserLanding from '../pages/userlandingpage';
import { randomInt } from 'crypto';
import exp from 'constants';

const url = "https://parabank.parasoft.com/parabank/index.htm"
const username = "pirate".concat(randomInt(1,100000).toString())
//const username ="pirate91622"
test.beforeEach(async({page}) => {
    const main = new Main(page)
    await main.gotourl(url)

})
test('Register new-user', async({page}) =>{
    // Open the page, click on register button, validate the title against presense of name 
    const register = new Register(page)
    const main = new Main(page)
    await main.click_to_register()
    await register.register_new_user(username)
    await register.validate_new_user(username)

})
test('Successful login', async({page}) =>{
    // perform login, compare screenshot
    const login = new Main(page)
    await login.enterlogininfo(username,"Test1234")
    await expect(page.getByText("Account Services")).toBeVisible()
    expect(await page.screenshot()).toMatchSnapshot('Successful-login.png',{maxDiffPixelRatio:0.02});
})
test("update user", async({page})=>{
    // update a user profile, pass all the user info, validate the confirmation message, the text inside each field is
    // is done via script. cant be validated
    const up = new UpdateProfile(page)
    const login = new Main(page)
    const ul = new UserLanding(page)
    await login.enterlogininfo(username,"Test1234")
    await ul.click_update_contact_info()
    await up.update_info()
    await up.validate() 
})
test('Unsuccessful login', async({page})=>{
    // incorrect login, validate error message 
    const main = new Main(page)
    const login = new Main(page)
    await login.enterlogininfo("dontexists","dfsdf")
    await expect(page.getByText("The username and password could not be verified.")).toBeVisible()
    expect(await page.screenshot()).toMatchSnapshot('Unsuccessful login.png',{maxDiffPixelRatio:0.02});
})
test ('Fail login', async({page})=>{
    // fail login with empty username, empty password, sql injection
    const main = new Main(page)
    const login = new Main(page)
    await login.enterlogininfo("","dfsdf")
    main.verify_error_message("Please enter a username and password.")
    await login.enterlogininfo("f","")
    main.verify_error_message("Please enter a username and password.")
    // breaks the instance
    // await login.enterlogininfo("SELECT * FROM Users WHERE User = 1 OR 1=1;","SELECT * FROM Users WHERE User = 1 OR 1=1;")
    // main.verify_error_message("The username and password could not be verified.")
})


