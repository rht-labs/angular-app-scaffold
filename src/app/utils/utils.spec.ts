import { AppComponent } from './../app.component';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Utils } from './utils';
import { HomeComponent } from 'src/app/components/home/home.component';
import { Location } from '@angular/common';

describe('Utils', () => {
  let utils: Utils;
  // this gets resassigned in the tests but tslint is not detecting this for some reason?!
  // tslint:disable-next-line:prefer-const
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Utils],
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'some/path', component: AppComponent }
        ])
      ]
    });
    utils = TestBed.get(Utils);
    location = TestBed.get(Location);
  });

  it('should be created', () => {
    expect(utils).toBeTruthy();
  });

  // routing tests
  it('should navigate to route when function is called', fakeAsync(() => {
    utils.navigateTo('/some/path');
    tick(10);
    expect(location.path()).toBe('/some/path');
  }));
  it('should navigate to route when function is called with query params of test and biscuits', fakeAsync(() => {
    utils.navigateTo('/some/path', { test: 'biscuits' });
    tick(10);
    expect(location.path()).toBe('/some/path?test=biscuits');
  }));
  it('should return current route', fakeAsync(() => {
    utils.navigateTo('/some/path');
    tick(10);
    expect(utils.getCurrentRoute()).toBe('/some/path');
  }));
});
