import { TestBed } from '@angular/core/testing';
import { AppComponentEdt } from './app.component.edt';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponentEdt
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentEdt);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'nasangularproject'`, () => {
    const fixture = TestBed.createComponent(AppComponentEdt);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nasangularproject');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentEdt);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('nasangularproject app is running!');
  });
});
