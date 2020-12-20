import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateTestingModule } from '@Mocks/translate.mock.spec';

import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', (): void => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'backbase-challenge'`, (): void => {
    expect(component.title).toEqual('backbase-challenge');
  });
});
