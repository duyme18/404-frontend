import {Component, OnInit} from '@angular/core';
import {Home} from '../services/home';
import {CategoryHome} from '../services/category-home';
import {CategoryRoom} from '../services/category-room';
import {StatusHome} from '../services/status-home';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';

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
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    description: new FormControl(''),
    categoryHomeId: new FormControl(''),
    categoryRoomId: new FormControl(''),
    statusHomeId: new FormControl('')
  });
  private info: any;


  constructor(private homeService: HomeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService) {
  }

  deleteHome(i) {
    const home = this.homeList[i];
    console.log(home);
    this.homeService.deleteHome(home.id).subscribe(() => {
      this.homeList = this.homeList.filter(t => t.id !== home.id);
    });
  }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };

    // console.log(this.info);

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
      name,
      address,
      bedroomQuantity,
      bathroomQuantity,
      price,
      file,
      description,
      latitude,
      longitude,
      categoryHomeId,
      categoryRoomId,
      statusHomeId
    } = this.homeForm.value;

    const home = {
      name,
      address,
      bedroomQuantity,
      bathroomQuantity,
      price,
      file,
      description,
      latitude,
      longitude,
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
          alert('Upload File Fail');
        }
      );
    }, error => {
      return alert('Error Add Home!!!');
    });
    console.log('Thêm thành công');
    closeButton.click();
    this.homeForm.reset();
  }
}
