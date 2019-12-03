import {Component, OnInit} from '@angular/core';
import {Home} from '../services/home';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../services/home.service';
import {CategoryHome} from '../services/category-home';
import {CategoryRoom} from '../services/category-room';
import {StatusHome} from '../services/status-home';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {

  fileUpload: File;
  // homeList: Home[];

  id: any;
  home: Home;
  homeForm: FormGroup;
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];
  categoryHomeId = '';
  categoryRoomId = '';
  statusHomeId = '';

  constructor(private route: ActivatedRoute,
              private homeService: HomeService,
              private fb: FormBuilder,
              private router: Router) {
    this.route.params.subscribe(
      result => {
        this.id = result.homeId;
      }
    );
  }

  // private getHomeList() {
  //   this.homeService.getList().subscribe(result => {
  //     this.homeList = result;
  //   });
  // }

  ngOnInit() {
    console.log(this.id);
    this.homeService.getCategoryHomeList().subscribe(result => {
      this.categoryHomeList = result;
    });
    this.homeService.getCategoryRoomList().subscribe(result => {
      this.categoryRoomList = result;
    });
    this.homeService.getStatusHomeList().subscribe(result => {
      this.statusHomeList = result;
    });

    this.homeForm = this.fb.group({
      name: [''],
      address: [''],
      bedroomQuantity: [''],
      bathroomQuantity: [''],
      price: [''],
      file: [''],
      latitude: [''],
      longitude: [''],
      description: [''],
      categoryHomeId: [''],
      categoryRoomId: [''],
      statusHomeId: ['']
    });
    const id = +this.route.snapshot.paramMap.get('homeId');
    this.homeService.getHomeId(id).subscribe(next => {
      console.log(next);
      this.home = next;
      this.homeForm.patchValue(this.home);
      console.log(this.home);
    }, error => {
      console.log(error);
    });

  }

  handleFileChoose(files: FileList) {
    this.fileUpload = files.item(0);
  }

  editHome() {
    console.log(this.statusHomeId, this.categoryHomeId , this.categoryRoomId);
    if (this.categoryRoomId === '') {
      this.categoryRoomId = this.home.categoryRoom.id;
    }
    if (this.categoryHomeId === '') {
      this.categoryHomeId = this.home.categoryHome.id;
    }
    if (this.statusHomeId === '') {
      this.statusHomeId = this.home.statusHome.id;
    }

    //   const {
    //     name, address, bedroomQuantity, bathroomQuantity, price, file, latitude, longitude, description, categoryHomeId,
    //     categoryRoomId, statusHomeId
    //   } = this.homeForm.value;
    //
    const home = {
      id: this.id,
      name: this.home.name,
      address: this.home.address,
      bedroomQuantity: this.home.bedroomQuantity,
      bathroomQuantity: this.home.bathroomQuantity,
      price: this.home.price,
      file: this.home.file,
      latitude: this.home.latitude,
      longitude: this.home.longitude,
      description: this.home.description,
      categoryHome: {
        id: this.categoryHomeId
      },
      categoryRoom: {
        id: this.categoryRoomId
      },
      statusHome: {
        id: this.statusHomeId
      }
    };
    console.log(home);
    this.homeService.updateHome(home, this.id).subscribe(next => {
      if (this.fileUpload === null || this.fileUpload === undefined) {
        console.log('create home ok');
      } else {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.homeService.addFile(form, String(next.id)).subscribe(
          result => {
            console.log(next.id);
          }, error => {
            alert('Upload file fail');
          }
        );
      }
    }, error => {
      return alert('error edit home');
    });
    console.log('Sửa thành công');
    this.homeForm.reset();
  }
}
