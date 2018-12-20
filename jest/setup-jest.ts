import 'jest-preset-angular';
/**Might be a hack, solution found here https://github.com/thymikee/jest-preset-angular/issues/63*/
import { MutationObserver } from './mutation-observer';

Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });
