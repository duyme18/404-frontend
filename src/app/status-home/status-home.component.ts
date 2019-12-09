import {Component, OnInit} from '@angular/core';
import {StatusHome} from '../model/status-home';
import {FormControl, FormGroup} from '@angular/forms';
import {StatusHomeService} from '../services/status-home.service';

@Component({
  selector: 'app-status-home',
  templateUrl: './status-home.component.html',
  styleUrls: ['./status-home.component.scss']
})
export class StatusHomeComponent implements OnInit {
  statusHomeList: StatusHome[];
  statusHomeId: any;

  statusHomeForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private statusHomeService: StatusHomeService) {
  }

  ngOnInit() {
    this.getStatusHomeList();
  }


  deleteStatusHome(closeModalRef2: HTMLButtonElement) {
    this.statusHomeService.deleteStatusHome(this.statusHomeId).subscribe(next => {
      this.getStatusHomeList();
      closeModalRef2.click();
    });
  }

  getStatusHomeList() {
    this.statusHomeService.getStatusHomeList().subscribe(result => {
      this.statusHomeList = result;
    });
  }

  saveStatusHome(closeButton: HTMLInputElement) {
    const {name} = this.statusHomeForm.value;
    if (name === '') {
      closeButton.click();
      return alert('Name can not empty');
    }
    const statusHome = {
      name
    };
    this.statusHomeService.createStatusHome(statusHome).subscribe(next => {
      closeButton.click();
      this.getStatusHomeList();
      this.statusHomeForm.reset();
    });
  }

  getStatusHomeId(idStatusHome) {
    this.statusHomeId = idStatusHome;
  }

  updateStatusHome(closeModalRef1: HTMLButtonElement) {
    const {name} = this.statusHomeForm.value;
    if (name === '') {
      closeModalRef1.click();
      return alert('Nothing change!');
    }
    const statusHome = {
      id: this.statusHomeId,
      name
    };
    this.statusHomeService.updateStatusHome(statusHome).subscribe(result => {
      closeModalRef1.click();
      this.getStatusHomeList();
    });
  }
}
