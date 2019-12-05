import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRoomComponent } from './category-room.component';

describe('CategoryRoomComponent', () => {
  let component: CategoryRoomComponent;
  let fixture: ComponentFixture<CategoryRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
