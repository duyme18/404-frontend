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
import {environment} from '../../../environments/environment';
import {ImageHome} from '../../model/image-home';

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
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    description: new FormControl(''),
    categoryHomeId: new FormControl(''),
    categoryRoomId: new FormControl(''),
    statusHomeId: new FormControl('')
  });
  private info: any;
  private filePath: any;
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
    });
  }

  handleFileChoose(files: FileList) {
    console.log(this.filePath);
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;

    };
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(this.urls);
          this.urls.push(event.target.result);
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

  addFiles(event) {
    this.fileList = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileList.push(event.target.files.item(i));
      console.log('file upload');
    }
  }

  addFileUrl(event) {
    this.fileUrl = null;
    this.fileUrl = event.target.files.item(0);
  }

  startUpload(file: File, home: Home) {
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
      }
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
        this.downloadURL = downloadURl;
        const {value} = this.fireForm;
        value.pathFile = downloadURl;
        value.home = home;
        this.imageUpload.addImage(value).subscribe(success => {
          console.log('success create new image');
        }, error => {
          console.log('fail to create image');
        });
      });
    });
  }

  startUploadFile(file: File, home: Home) {
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
      }
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
        home.file = this.downloadURL;
        console.log(home);
        this.homeService.updateHome(home, home.id).subscribe(next => {
          console.log('success upload 1 file');
        }, error => {
          console.log('fail upload 1 file');
        });
      });
    });
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
      console.log('success');
      this.startUploadFile(this.fileUrl, next);
      for (const fileUp of this.fileList) {
        this.startUpload(fileUp, next);
      }
    }, error => {
      return alert('Error Add Home!!!');
    });
    console.log('Thêm thành công');
    closeButton.click();
    this.homeForm.reset();
  }
}
