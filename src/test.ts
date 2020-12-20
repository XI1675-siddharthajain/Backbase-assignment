import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {} from 'jasmine';
// tslint:disable-next-line: no-submodule-imports ordered-imports
import 'zone.js/dist/zone-testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// tslint:disable-next-line: no-any
const context: any = require.context('./', true, /\.spec\.ts$/);

context.keys().map(context);
