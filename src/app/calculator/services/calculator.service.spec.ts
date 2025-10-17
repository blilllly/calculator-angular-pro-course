import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {});
  afterEach(() => {});
  afterAll(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resulText, subResultText to 0 when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.construcNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.construcNumber('1');
    expect(service.resultText()).toBe('1');
    service.construcNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.construcNumber('1');
    service.construcNumber('-');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.construcNumber('1');
    service.construcNumber('+');
    service.construcNumber('2');
    service.construcNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    service.construcNumber('5');
    service.construcNumber('-');
    service.construcNumber('2');
    service.construcNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for multiplication', () => {
    service.construcNumber('5');
    service.construcNumber('*');
    service.construcNumber('2');
    service.construcNumber('=');

    expect(service.resultText()).toBe('10');
  });

  it('should calculate result correctly for division', () => {
    service.construcNumber('1');
    service.construcNumber('0');
    service.construcNumber('/');
    service.construcNumber('2');
    service.construcNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    service.construcNumber('1');
    service.construcNumber('.');
    service.construcNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.construcNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with zero', () => {
    service.construcNumber('0');
    service.construcNumber('.');
    service.construcNumber('0');

    expect(service.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    service.construcNumber('1');
    service.construcNumber('+/-');

    expect(service.resultText()).toBe('-1');
  });

  it('should handle backspace correctly', () => {
    service.resultText.set('123');

    service.construcNumber('Backspace');
    expect(service.resultText()).toBe('12');

    service.construcNumber('Backspace');
    expect(service.resultText()).toBe('1');

    service.construcNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    for (let i = 0; i < 10; i++) {
      service.construcNumber('1');
    }

    expect(service.resultText().length).toBe(10);
    service.construcNumber('1');
    expect(service.resultText().length).toBe(10);
  });
});
