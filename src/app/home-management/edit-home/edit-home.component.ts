import {Component, OnInit} from '@angular/core';
import {Home} from '../../model/home';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import {CategoryHome} from '../../model/category-home';
import {CategoryRoom} from '../../model/category-room';
import {StatusHome} from '../../model/status-home';
import * as firebase from 'firebase';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ImageHomeService} from '../../services/image-home.service';
import {environment} from '../../../environments/environment';

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
  fileList: File[] = [];
  homeForm: FormGroup;
  categoryHomeList: CategoryHome[];
  categoryRoomList: CategoryRoom[];
  statusHomeList: StatusHome[];
  categoryHomeId = '';
  categoryRoomId = '';
  statusHomeId = '';
  downloadURL: string;
  fileAvatar: File;

  // private appFirebase2 = firebase.initializeApp(environment.firebase);

  fireForm = this.fb.group({
    id: [''],
    pathFile: [''],
    home: ['']
  });
  filePath: any;
  urls: any[] = [];


  constructor(private route: ActivatedRoute,
              private homeService: HomeService,
              private fb: FormBuilder,
              private router: Router,
              private token: TokenStorageService,
              private imageUpload: ImageHomeService) {
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

  handleFileChoose(files: FileList) {
    console.log(this.filePath);
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;

    };
  }

  clickDeleteFile() {
    const id = +this.route.snapshot.paramMap.get('homeId');
    this.imageUpload.getAllByHome(id).subscribe(next => {
      for (const image of next) {
        this.imageUpload.deleteImage(image.id).subscribe(success => {
          console.log('success delete');
        }, error => {
          console.log('fail to delete');
        });
      }
    }, error => {
      console.log('fail to get home id');
    });
  }

  editHome() {
    const id = +this.route.snapshot.paramMap.get('homeId');
    this.homeService.getHomeId(id).subscribe(next => {
      this.startUpload(this.fileAvatar, next, false);
      for (const fileUp of this.fileList) {
        this.startUpload(fileUp, next, true);
      }
      console.log('success');
    }, error => {
      console.log('fail to upload');
    });

    console.log(this.statusHomeId, this.categoryHomeId, this.categoryRoomId);
    if (this.categoryRoomId === '') {
      this.categoryRoomId = this.home.categoryRoom.id;
    }
    if (this.categoryHomeId === '') {
      this.categoryHomeId = this.home.categoryHome.id;
    }
    if (this.statusHomeId === '') {
      this.statusHomeId = this.home.statusHome.id;
    }

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
        console.log('success');
      }
    }, error => {
      return alert('error edit home');
    });
    console.log('Sửa thành công');
    this.homeForm.reset();
  }

  addFiles(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileList.push(event.target.files.item(i));
      console.log('file upload');
    }
  }

  addOneFile(event) {
    this.fileAvatar = event.target.files.item(0);
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
          home.file = downloadURl;
          this.homeService.updateHome(home, home.id).subscribe(next => {
            console.log('success to edit avatar');
          }, error => {
            console.log('fail to edit avatar');
          });
        }
      });
    });
  }
}
