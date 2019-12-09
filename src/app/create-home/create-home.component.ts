import {Component, OnInit} from '@angular/core';
import {HomeService} from '../services/home.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HomeImageService} from '../services/home-image.service';
import {FileUpload} from '../model/fileupload';
import {CategoryHome} from '../model/category-home';
import {CategoryRoom} from '../model/category-room';
import {StatusHome} from '../model/status-home';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.scss']
})
export class CreateHomeComponent implements OnInit {
  homeForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  message: string;
  isCreateFailed: boolean;

  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];

  constructor(private homeService: HomeService,
              private fb: FormBuilder,
              private uploadService: HomeImageService) {
  }

  ngOnInit() {
    this.homeForm = this.fb.group({
      name: [''],
      address: [''],
      bedroomQuantity: [''],
      bathroomQuantity: [''],
      price: [''],
      file: null,
      latitude: [''],
      longitude: [''],
      description: [''],
      categoryHomeList: [''],
      categoryRoomList: [''],
      statusHomeList: ['']
    });
  }

  onSubmit() {
    if (this.homeForm.valid) {
      this.homeForm.patchValue({imageUrls: this.uploadService.image.slice(9).trim()});
      const {value} = this.homeForm;
      console.log(value);
      this.homeService.addHome(value)
        .subscribe(next => {
          this.isCreateFailed = false;
          console.log('Thanh cong');
        }, error => {
          this.message = 'Tạo không thành công';
          this.isCreateFailed = true;
        });
    }

  }

  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    // console.log(this.currentFileUpload);
    // this.data.setValue({ avatar: this.currentFileUpload.url});
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
