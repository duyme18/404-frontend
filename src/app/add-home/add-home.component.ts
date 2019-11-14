import { Component, OnInit } from '@angular/core';
import {Home} from '../home';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.scss']
})
export class AddHomeComponent implements OnInit {

  homeList: Home[];
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];

  homeForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    bedroomQuantity: new FormControl(''),
    bathroomQuantity: new FormControl(''),
    price: new FormControl(''),
    file: new FormControl(''),
    description: new FormControl(''),
    categoryHomeId: new FormControl(''),
    categoryRoomId: new FormControl(''),
    statusHomeId: new FormControl('')
  });

  fileUpload: File;


  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.getHomeList();
    this.homeService.getCategoryHomeList().subscribe(result => {
      this.categoryHomeList = result;
    });
    this.homeService.getCategoryRoomList().subscribe(result => {
      this.categoryRoomList = result;
    });
    this.homeService.getStatusHomeList().subscribe(result => {
      this.statusHomeList = result;
    });
  }

  private getHomeList() {
    this.homeService.getList().subscribe(result => {
      this.homeList = result;
    });
  }

  handleFileChoose(files: FileList) {
    this.fileUpload = files.item(0);
  }

  saveHome(closeButton: HTMLInputElement) {
    const {
      name, address, bedroomQuantity, bathroomQuantity, price, file, description, categoryHomeId,
      categoryRoomId, statusHomeId
    } = this.homeForm.value;

    const home = {
      name,
      address,
      bedroomQuantity,
      bathroomQuantity,
      price,
      file,
      description,
      categoryHome: {
        id: categoryHomeId
      },
      categoryRoom: {
        id: categoryRoomId
      },
      statusHome: {
        id: statusHomeId
      }
    };
    console.log(home);
    this.homeService.addHome(home).subscribe(next => {
      const form = new FormData();
      form.append('file', this.fileUpload);
      this.homeService.addFile(form, String(next.id)).subscribe(
        result => {
          console.log(next.id);
        }, error => {
          alert('Upload file fail');
        }
      );
    }, error => {
      return alert('error add home');
    });
    console.log('Thêm thành công');
    this.getHomeList();
    closeButton.click();
    this.homeForm.reset();
  }
}
