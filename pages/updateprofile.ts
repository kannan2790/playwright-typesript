import { expect, Page } from "@playwright/test";
import Register from './register'
import UserLanding from "./userlandingpage";

class UpdateProfile{
    page : Page
    constructor (page : Page){
        this.page = page;
    }
    names: string[] = ["updated name","captain","2e ave","pacific","sea","345","55555"];
    async update_info(){
        console.log("sdfgdfgsdfgdfghfdghfghjgfhj")
        const reg = new Register(this.page)
        await reg.fill_firstname(this.names[0])
        await reg.fill_lastname(this.names[1])
        await reg.fill_address(this.names[2])
        await reg.fill_city(this.names[3])
        await reg.fill_state(this.names[4])
        await reg.fill_zip(this.names[5])
        await reg.fill_phone(this.names[6])
        await this.click_update_profile()

    }
    async click_update_profile(){
        await this.page.locator("//input[@value='Update Profile']").click()
    }

    async validate_update_message(){
        await expect(this.page.getByText("Your updated address and phone number have been added to the system.")).toBeVisible()
    }

    async validate_updated_entries(){
        await expect(this.page.getByText(this.names[0])).toBeVisible()
        await expect(this.page.getByText(this.names[1])).toBeVisible()
        await expect(this.page.getByText(this.names[2])).toBeVisible()
        await expect(this.page.getByText(this.names[3])).toBeVisible()
        await expect(this.page.getByText(this.names[4])).toBeVisible()
        await expect(this.page.getByText(this.names[5])).toBeVisible()
        await expect(this.page.getByText(this.names[6])).toBeVisible()
    }
    async validate(){
        const userlanding = new UserLanding(this.page)
        await this.validate_update_message()
        await userlanding.click_update_contact_info()
        //await this.validate_updated_entries()
    }
}
export default UpdateProfile