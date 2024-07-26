import { expect, Page } from "@playwright/test";
class Login{
    page : Page
    constructor (page : Page){
        this.page = page;
    }
    async gotourl(url : string){
        await this.page.goto(url)
    }

    async enter_username(user : string){
        await this.page.locator("//input[@name='username']").fill(user)
    }
    async enter_password(pwd : string){
        await this.page.locator("//input[@name='password']").fill(pwd)
    }
    async enterlogininfo(user,pwd : string){
        await this.enter_username(user)
        await this.enter_password(pwd)
        await this.page.locator("//input[@value='Log In']").click() 

    }
    async click_to_register(){
        await this.page.locator("//a[contains(text(),'Register')]").click()
    }
    async verify_error_message(str : string){
        const err = await this.page.locator("//p[@class='error']").textContent()
        expect(err).toBe(str)
    }
}
export default Login