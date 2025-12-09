import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeysPage } from './keys.page';

describe('KeysPage', () => {
  let component: KeysPage;
  let fixture: ComponentFixture<KeysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
