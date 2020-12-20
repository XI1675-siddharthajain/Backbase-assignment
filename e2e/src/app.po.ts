import { browser, by, element } from 'protractor';

export class AppPage {
  public static async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  public static async getTitleText(): Promise<string> {
    return element(by.css('bb-root .content span')).getText();
  }
}
