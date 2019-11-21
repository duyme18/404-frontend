import {Component, OnInit} from '@angular/core';
import {Home} from '../home';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../home.service';
import {CategoryHome} from '../category-home';
import {CategoryRoom} from '../category-room';
import {StatusHome} from '../status-home';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {

  fileUpload: File;
  homeList: Home[];

  id: any;
  home: Home;
  homeForm: FormGroup;
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];

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

  private getHomeList() {
    this.homeService.getList().subscribe(result => {
      this.homeList = result;
    });
  }

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
      statusHomeId: [''],
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
    const {
      name, address, bedroomQuantity, bathroomQuantity, price, file, latitude, longitude, description, categoryHomeId,
      categoryRoomId, statusHomeId
    } = this.homeForm.value;

    const home = {
      id: this.id,
      name,
      address,
      bedroomQuantity,
      bathroomQuantity,
      price,
      file,
      latitude,
      longitude,
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
    this.homeService.updateHome(home, this.id).subscribe(next => {
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
      return alert('error edit home');
    });
    console.log('Thêm thành công');
    this.getHomeList();
    this.homeForm.reset();
  }
}
