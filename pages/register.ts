import { expect, Page } from "@playwright/test";
import exp from "constants";
import { randomInt } from "crypto";
class Register{
    page : Page
    constructor (page : Page){
        this.page = page;
    }
    async fill_firstname(name : string){
        expect(await this.page.locator("//input[@id='customer.firstName']")).toBeVisible()
        await this.page.locator("//input[@id='customer.firstName']").fill(name)
    }
    async fill_lastname(name : string){
        expect(await this.page.locator("//input[@id='customer.lastName']")).toBeVisible()
        await this.page.locator("//input[@id='customer.lastName']").fill(name)
    }
    async fill_address(addr : string){
        expect(await this.page.locator("//input[@id='customer.address.street']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.street']").fill(addr)
    }
    async fill_city(city : string){
        expect(await this.page.locator("//input[@id='customer.address.city']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.city']").fill(city)
    }
    async fill_state(state : string){
        expect(await this.page.locator("//input[@id='customer.address.state']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.state']").fill(state)
    }
    async fill_zip(zip : string){
        expect(await this.page.locator("//input[@id='customer.address.zipCode']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.zipCode']").fill(zip)
    }
    async fill_phone(phone : string){
        expect(await this.page.locator("//input[@id='customer.phoneNumber']")).toBeVisible()
        await this.page.locator("//input[@id='customer.phoneNumber']").fill(phone)
    }
    async fill_ssn(ssn : string){
        expect(await this.page.locator("//input[@id='customer.ssn']")).toBeVisible()
        await this.page.locator("//input[@id='customer.ssn']").fill(ssn)
    }
    async fill_username(usr : string){
        expect(await this.page.locator("//input[@id='customer.username']")).toBeVisible()
        await this.page.locator("//input[@id='customer.username']").fill(usr)
    }
    async fill_password(pwd : string){
        expect(await this.page.locator("//input[@id='customer.password']")).toBeVisible()
        await this.page.locator("//input[@id='customer.password']").fill(pwd)
        expect(await this.page.locator("//input[@id='repeatedPassword']")).toBeVisible()
        await this.page.locator("//input[@id='repeatedPassword']").fill(pwd)
    }
    async click_register(){
        await this.page.locator("//input[@value='Register']").click()
    }
    async register_new_user(usr : string){
        await this.fill_firstname("captain")
        await this.fill_lastname("pirate")
        await this.fill_address("1e avenue")
        await this.fill_city("atlantic")
        await this.fill_state("ocean")
        await this.fill_zip("12345")
        await this.fill_phone("1234567890")
        await this.fill_ssn("12345")
        await this.fill_username(usr)
        await this.fill_password("Test1234")
        await this.click_register()
    }
    async validate_new_user(usr : string){
        expect (await this.page.locator("//h1[contains(text(),'Welcome '"+usr+")]")).toBeVisible
        expect (await this.page.locator("//p[contains(text(),'Your account was created successfully. You are now logged in.')]")).toBeVisible

    }
}
export default Register