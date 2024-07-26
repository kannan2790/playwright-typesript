import { expect, Page } from "@playwright/test";
class UserLanding{
    page : Page
    constructor (page : Page){
        this.page = page;
    }
    async click_update_contact_info(){
        await this.page.locator("//a[contains(text(),'Update Contact Info')]").click()
    }
}
export default UserLanding