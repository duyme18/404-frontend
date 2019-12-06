import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryRoomService} from '../../services/category-room.service';
import {CategoryRoom} from '../../services/category-room';
import {SearchCategoryHomeByName} from '../category-home/search-category-home-by-name';

@Component({
  selector: 'app-category-room',
  templateUrl: './category-room.component.html',
  styleUrls: ['./category-room.component.scss']
})
export class CategoryRoomComponent implements OnInit {
  categoryRoomList: CategoryRoom[];
  categoryRoomId: any;
  searchName = '';

  categoryRoomForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private categoryRoomService: CategoryRoomService) {
  }

  ngOnInit() {
    this.getCategoryRoomList();
  }

  deleteCategoryHome(closeModalRef2: HTMLButtonElement) {
    this.categoryRoomService.deleteCategoryRoom(this.categoryRoomId).subscribe(next => {
      this.getCategoryRoomList();
      closeModalRef2.click();
    });
  }

  getCategoryRoomList() {
    this.categoryRoomService.getListCategoryRoom().subscribe(result => {
      this.categoryRoomList = result;
    });
  }

  searchCategoryRoomByName() {
    const categoryRoomForm: SearchCategoryHomeByName = {
      name: this.searchName
    };
    this.categoryRoomService.searchCategoryRoomByName(categoryRoomForm).subscribe(result => {
      this.categoryRoomList = result;
    }, error => {
      console.log(error);
    });
  }

  saveCategoryRoom(closeButton: HTMLInputElement) {
    const {name} = this.categoryRoomForm.value;
    if (name === '') {
      closeButton.click();
      return alert('Name can not empty');
    }
    const categoryHome = {
      name
    };
    this.categoryRoomService.createCategoryRoom(categoryHome).subscribe(next => {
      closeButton.click();
      this.getCategoryRoomList();
      this.categoryRoomForm.reset();
    });
  }

  getCategoryRoomId(idCategoryRoom) {
    this.categoryRoomId = idCategoryRoom;
  }

  updateCategoryRoom(closeModalRef1: HTMLButtonElement) {
    const {name} = this.categoryRoomForm.value;
    if (name === '') {
      closeModalRef1.click();
      return alert('Nothing change!');
    }
    const categoryRoom = {
      id: this.categoryRoomId,
      name
    };
    this.categoryRoomService.updateCategoryRoom(categoryRoom).subscribe(result => {
      closeModalRef1.click();
      this.getCategoryRoomList();
    });
  }
}
