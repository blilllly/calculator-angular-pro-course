import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should be 3', () => {
    // A = Arrange - Arreglar
    const num1 = 1;
    const num2 = 2;

    // A = Act - Actuar
    const result = num1 + num2;

    // A = Assert - Afirmar
    expect(result).toBe(3);
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-500 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    expect(divElement).not.toBeNull();

    // divElement?.classList.forEach((className) => {
    //   expect(mustHaveClasses).toContain(className);
    // });

    const divClasses = divElement?.classList.value.split(' ');

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  // it("should contain the 'buy me a beer' link", () => {
  //   const anchorElement = compiled.querySelector('a');
  //   expect(anchorElement).not.toBeNull();
  //   expect(anchorElement?.href).toBe('link');
  // });
});
