import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryHomeService} from '../../services/category-home.service';
import {CategoryHome} from '../../model/category-home';
import {Home} from '../../model/home';
import {SearchCategoryHomeByName} from './search-category-home-by-name';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss']
})
export class CategoryHomeComponent implements OnInit {
  categoryHomeList: CategoryHome[];
  categoryHomeId: any;
  searchName = '';

  categoryHomeForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private categoryHomeService: CategoryHomeService) {
  }

  ngOnInit() {
    this.getCategoryHomeList();
  }

  searchCategoryHomeByName() {
    const categoryHomeForm: SearchCategoryHomeByName = {
      name: this.searchName
    };
    this.categoryHomeService.searchCategoryHomeByName(categoryHomeForm).subscribe(result => {
      this.categoryHomeList = result;
    }, error => {
      console.log(error);
    });
  }

  deleteCategoryHome(closeModalRef2: HTMLButtonElement) {
    this.categoryHomeService.deleteCategoryHome(this.categoryHomeId).subscribe(next => {
      this.getCategoryHomeList();
      closeModalRef2.click();
    });
  }

  getCategoryHomeList() {
    this.categoryHomeService.getCategoryHomeList().subscribe(result => {
      this.categoryHomeList = result;
    });
  }

  saveCategoryHome(closeButton: HTMLInputElement) {
    const {name} = this.categoryHomeForm.value;
    if (name === '') {
      closeButton.click();
      return alert('Name can not empty');
    }
    const categoryHome = {
      name
    };
    this.categoryHomeService.createCategoryHome(categoryHome).subscribe(next => {
      closeButton.click();
      this.getCategoryHomeList();
      this.categoryHomeForm.reset();
    });
  }

  getCategoryHomeId(idCategoryHome) {
    this.categoryHomeId = idCategoryHome;
  }

  updateCategoryHome(closeModalRef1: HTMLButtonElement) {
    const {name} = this.categoryHomeForm.value;
    if (name === '') {
      closeModalRef1.click();
      return alert('Nothing change!');
    }
    const categoryHome = {
      id: this.categoryHomeId,
      name
    };
    this.categoryHomeService.updateCategoryHome(categoryHome).subscribe(result => {
      closeModalRef1.click();
      this.getCategoryHomeList();
    });
  }
}
