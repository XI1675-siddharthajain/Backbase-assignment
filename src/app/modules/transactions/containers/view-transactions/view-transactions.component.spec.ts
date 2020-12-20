import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '@Components/header/header.component';
import { TranslateTestingModule } from '@Mocks/translate.mock.spec';

import { ViewTransactionsComponent } from './view-transactions.component';

describe('ViewTransactionsComponent', (): void => {
  let component: ViewTransactionsComponent;
  let fixture: ComponentFixture<ViewTransactionsComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
      ],
      declarations: [
        ViewTransactionsComponent,
        HeaderComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ViewTransactionsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
