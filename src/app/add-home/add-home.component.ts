import {Component, OnInit} from '@angular/core';
import {Home} from '../home';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../home.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.scss']
})
export class AddHomeComponent implements OnInit {
  fileUpload: File;
   Home;
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


  constructor(private homeService: HomeService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  deleteHome(i) {
    const home = this.homeList[i];
    this.homeService.deleteHome(home.id).subscribe(() => {
      this.homeList = this.homeList.filter(t => t.id !== home.id);
    });
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

    const id = +this.route.snapshot.paramMap.get('id');
    this.homeService.getHomeId(id).subscribe(
      next => {
        this.Home = next;
        this.homeForm.patchValue(this.homeList);
      }, error => {
        console.log(error);
        this.homeList = null;
      }
    );
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
          this.getHomeList();
        }, error => {
          alert('Upload file fail');
        }
      );
    }, error => {
      return alert('error add home');
    });
    console.log('Thêm thành công');
    closeButton.click();
    this.homeForm.reset();
  }
}
