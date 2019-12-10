import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryHome} from '../../model/category-home';
import {CategoryRoom} from '../../model/category-room';
import {StatusHome} from '../../model/status-home';
import {Home} from '../../model/home';
import {TokenStorageService} from '../../auth/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IComment} from '../../model/comment';
import {CommentService} from '../../services/comment.service';
import {ImageHomeService} from '../../services/image-home.service';
import {ImageHome} from '../../model/image-home';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {

  homeId: string;
  userId: string;
  home: Home;
  id: number;
  iFile: ImageHome[] = [];
  homeName: string;
  categoryHome: CategoryHome;
  categoryRoom: CategoryRoom;
  statusHome: StatusHome;
  locationChosen: boolean;
  formCommentCreate = new FormGroup({
    commentInput: new FormControl('')
  });
  commentUpdate = new FormControl();
  commentList: IComment[] = [];
  idComment: number;
  tokenJWT: string;
  info: any;
  lat: number;
  lng: number;
  zoom: number;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private homeService: HomeService,
              private commentService: CommentService,
              private router: Router,
              private token: TokenStorageService,
              private imageHome: ImageHomeService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.homeId;
      this.homeName = params.homeName;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit() {
    this.lat = 16.0471659;
    this.lng = 108.1891961;
    this.zoom = 15;
    this.imageHome.getAllByHome(this.id).subscribe(next => {
      this.iFile = next;
      console.log('success get file by home');
    }, error => {
      console.log('fail to get file by home');
    });
    console.log(this.homeId, this.token.getUserId());
    this.getHomeId();
    this.getAllCommentThisHome();

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };

    this.getHomeId();
    this.homeService.getCategoryHomeList().subscribe(result => {
      this.categoryHome = this.categoryHome;
    });
    this.homeService.getCategoryRoomList().subscribe(result => {
      this.categoryRoom = this.categoryRoom;
    });
    this.homeService.getStatusHomeList().subscribe(result => {
      this.statusHome = this.statusHome;
    });
  }
  mapClick(event) {
    // console.log(event);
  }

  mapDoubleClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  getHomeId() {
    this.homeService.getHomeId(this.id).subscribe(result => {
      this.home = result;
    }, error => {
      console.log(error);
    });
  }

  bookingButton() {
    if (this.info.token != null) {
      return this.router.navigateByUrl('/create-booking/' + this.id);
    } else {
      return this.router.navigateByUrl('/login');

    }
  }

  getAllCommentThisHome() {
    this.commentService.getAllCommentByHome(this.id).subscribe(result => {
      this.commentList = result;
    }, error => {
      console.log(error);
    });
  }

  createComment() {
    const {commentInput} = this.formCommentCreate.value;
    if (commentInput === '') {
      return;
    }
    const comment: IComment = {
      idHome: this.id,
      comment: commentInput,
      user: {
        id: this.token.getUserId()
      }
    };
    this.commentService.createComment(comment).subscribe(
      result => {
        console.log(result, 'ok');
        this.formCommentCreate.reset();
        this.getAllCommentThisHome();
      }, error => {
        console.log(error);
      }
    );
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisHome();
    this.commentUpdate.reset();
  }

  updateComment(commentId: number, closeModalRef: HTMLAnchorElement) {
    if (this.commentUpdate.value == null) {
      return this.closeForm(closeModalRef);
    }
    const comment: IComment = {
      id: commentId,
      comment: this.commentUpdate.value
    };
    this.commentService.editComment(comment).subscribe(result => {
      this.closeForm(closeModalRef);
    }, error => {
      console.log(error);
    });
    console.log(comment);
  }

  getIdComment(id: number) {
    this.idComment = id;
  }

  deleteComment(closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(this.idComment).subscribe(result => {
      this.getAllCommentThisHome();
      closeModalRef2.click();
    }, error => {
      console.log(error);
    });
  }
}
