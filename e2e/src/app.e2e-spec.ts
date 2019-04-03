import { Common } from './common/common.po';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let common: Common;

  beforeEach(() => {
    page = new AppPage();
    common = new Common();
  });

  it('should display welcome message', () => {
    common.navigateTo('/');
    expect(page.getParagraphText()).toEqual('Welcome to Angular 7!');
  });
});
