import {Component, OnInit} from '@angular/core';
import {Home} from '../../model/home';
import {CategoryHome} from '../../model/category-home';
import {CategoryRoom} from '../../model/category-room';
import {StatusHome} from '../../model/status-home';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../auth/token-storage.service';
import * as firebase from 'firebase';
import {ImageHomeService} from '../../services/image-home.service';

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.scss']
})
export class AddHomeComponent implements OnInit {
  fileUpload: File;
  fileList: File[] = [];
  Home;
  homeList: Home[];
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];
  downloadURL: string;
  fileUrl: File;

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
    statusHomeId: new FormControl(''),
  });
  info: any;
  filePath: any;
  urls: any[] = [];

  constructor(private homeService: HomeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService,
              private imageUpload: ImageHomeService) {
  }

  fireForm = this.fb.group({
    id: [''],
    pathFile: [''],
    home: ['']
  });

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
      console.log('asdf');
    });
  }

  handleFileChoose(event) {
    console.log(this.filePath);
    this.fileUpload = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (event2: any) => {
      this.filePath = event2.target.result;
    };
    reader.readAsDataURL(this.fileUpload);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event2: any) => {
          console.log(this.urls);
          this.urls.push(event2.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removePreviewImage(i: number) {
    this.urls.splice(i, 1);
    this.fileList.splice(i, 1);
    console.log(this.fileList);
    console.log(this.urls);
  }
  addFileUrl(event3) {
    this.fileUrl = null;
    this.fileUrl = event3.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (event2: any) => {
      this.filePath = event2.target.result;
    };
    reader.readAsDataURL(this.fileUrl);
    console.log(this.fileUrl);
    console.log(this.filePath);
  }

  addFiles(event) {
    this.fileList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileList.push(event.target.files.item(i));
      console.log('file upload');
    }
    console.log(this.fileList);
  }

  startUpload(file: File, home: Home, multi: boolean) {
    const metadata = {
      contentType: 'image/jpg'
    };
    const storageRef = firebase.storage().ref();
    const fileImage = storageRef.child('image/' + file.name).put(file, metadata);
    storageRef.child(file.name).getDownloadURL().then(url => {
      console.log(url);
    });
    fileImage.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is ' + progress + ' % done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('upload is paused');
          break;
      }  // private appFirebase = firebase.initializeApp(environment.firebase);

    }, errors => {
      switch (errors.message) {
        case 'storage/unauthorized':
          console.log('unauthorized');
          break;
        case 'storage/canceled':
          console.log('cancel upload');
          break;
        case 'storage/unknown':
          console.log('unknown');
          break;
      }
    }, () => {
      fileImage.snapshot.ref.getDownloadURL().then(downloadURl => {
        console.log('file available at: ' + downloadURl);
        if (multi === true) {
          console.log(file);
          this.downloadURL = downloadURl;
          const {value} = this.fireForm;
          value.pathFile = downloadURl;
          value.home = home;
          this.imageUpload.addImage(value).subscribe(success => {
            console.log('success create new image');
          }, error => {
            console.log('fail to create image');
          });
        } else {
          console.log(file);
          home.file = downloadURl;
          console.log(home);
          this.homeService.updateHome(home, home.id).subscribe(next => {
            console.log('success upload 1 file');
            this.getHomeList();
          }, error => {
            console.log('fail upload 1 file');
          });
        }
      });
    });
  }

  saveHome() {
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
      for (const fileUp of this.fileList) {
        this.startUpload(fileUp, next, true);
      }
      this.startUpload(this.fileUrl, next, false);
    }, error => {
      return alert('Error Add Home!!!');
    });
    console.log('Thêm thành công');
    this.homeForm.reset();
  }
}
