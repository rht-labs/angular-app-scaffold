import { by, element } from 'protractor';

export class AppPage {
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
