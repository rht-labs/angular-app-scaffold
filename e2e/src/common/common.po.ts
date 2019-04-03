import { browser, by, element, promise } from 'protractor';

export class Common {
  public navigateTo(path: string) {
    return browser.get(path).then(() => {
      return this.browserSleepytime(500).then(() => {
        return browser.waitForAngular();
      });
    });
  }

  public waitForAng() {
    return browser.waitForAngular();
  }

  public getUrlPath() {
    return browser.getCurrentUrl();
  }

  public getById(id: string) {
    return element(by.css(`#${id}`));
  }

  public getButtonByText(text: string) {
    return element(by.buttonText(text));
  }

  public getLastButtonByText(text: string) {
    return element.all(by.buttonText(text)).last();
  }

  public getInputField(text: string) {
    return element(by.id(text));
  }

  public browserRefresh() {
    return browser.navigate().refresh();
  }

  public browserSleepytime(length: number) {
    return browser.sleep(length || 1000);
  }

  public getActiveElement() {
    return browser.switchTo().activeElement();
  }

  public getAlert() {
    return browser.switchTo().alert();
  }

  public closeAlert() {
    return browser
      .switchTo()
      .alert()
      .accept();
  }

  public getLabels() {
    return browser.findElements(by.css('.label'));
  }

  public getSelectOption(select: any, optionNum: number) {
    select.all(by.tagName('option')).then(options => {
      options[optionNum].click();
    });
  }

  public getInputByLabelText(text: string) {
    return element(by.cssContainingText('label', new RegExp(`^${text}$`)))
      .getAttribute('for')
      .then(inputId => {
        return element(by.id(inputId));
      });
  }

  public getTableText() {
    return element(by.css('table')).getText();
  }

  public clearLocalStorage(): promise.Promise<void> {
    return browser.executeScript('return window.localStorage.clear()');
  }
}
