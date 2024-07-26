import { expect, Page } from "@playwright/test";
import exp from "constants";
import { randomInt } from "crypto";
import test from "node:test";
class Register{
    page : Page
    constructor (page : Page){
        this.page = page;
    }
    async fill_firstname(name : string){
        await expect(this.page.locator("//input[@id='customer.firstName']")).toBeVisible()
        await this.page.locator("//input[@id='customer.firstName']").clear()
        await this.page.locator("//input[@id='customer.firstName']").fill(name)
    }
    async fill_lastname(name : string){
        await expect( this.page.locator("//input[@id='customer.lastName']")).toBeVisible()
        await this.page.locator("//input[@id='customer.lastName']").fill(name)
    }
    async fill_address(addr : string){
        await expect(this.page.locator("//input[@id='customer.address.street']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.street']").fill(addr)
    }
    async fill_city(city : string){
        await expect(this.page.locator("//input[@id='customer.address.city']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.city']").fill(city)
    }
    async fill_state(state : string){
        await expect(this.page.locator("//input[@id='customer.address.state']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.state']").fill(state)
    }
    async fill_zip(zip : string){
        await expect(this.page.locator("//input[@id='customer.address.zipCode']")).toBeVisible()
        await this.page.locator("//input[@id='customer.address.zipCode']").fill(zip)
    }
    async fill_phone(phone : string){
        await expect(this.page.locator("//input[@id='customer.phoneNumber']")).toBeVisible()
        await this.page.locator("//input[@id='customer.phoneNumber']").fill(phone)
    }
    async fill_ssn(ssn : string){
        await expect(this.page.locator("//input[@id='customer.ssn']")).toBeVisible()
        await this.page.locator("//input[@id='customer.ssn']").fill(ssn)
    }
    async fill_username(usr : string){
        await expect(this.page.locator("//input[@id='customer.username']")).toBeVisible()
        await this.page.locator("//input[@id='customer.username']").fill(usr)
        console.log(usr)
    }
    async fill_password(pwd : string){
        await expect(this.page.locator("//input[@id='customer.password']")).toBeVisible()
        await this.page.locator("//input[@id='customer.password']").fill(pwd)
        await expect(this.page.locator("//input[@id='repeatedPassword']")).toBeVisible()
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
        const text = await this.page.locator("//h1[@class='title']").textContent()
        expect(text).toBe(`Welcome ${usr}`)
    }

}
export default Register