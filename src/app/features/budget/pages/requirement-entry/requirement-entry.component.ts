import { RequirementService } from '../../services/requirment.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Requirement } from '../../models/requirement';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MobileFormatPipe } from '../../../../shared/pipes/mobbile-format.pipe';

@Component({
  selector: 'app-requirement-entry',
  standalone: true,
  templateUrl: './requirement-entry.component.html',
  styleUrl: './requirement-entry.component.css',

  imports: [
    CommonModule,
    MobileFormatPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
// export  class  RequirementEntryComponent {
export default class RequirementEntryComponent {
  requirmentService = inject(RequirementService);

  httpClient = inject(HttpClient);

  // reqs:Requirment[] = [
  //   {id:1,title : 'Mouse 2 Units', contactMobileNo : '093544499'},
  //   {id:1,title : 'Mouse 1 Units', contactMobileNo : '088844499'}
  // ];

  // master data
  reqs: Requirement[] = [];

  // filter data
  filtered = this.reqs;

  isSmallTable = false;

  // new searchBox
  // searchBox = new FormControl<String>('ABC');

  searchBox = new FormControl<string>('', { nonNullable: true });

  // Observable : hole data ไว้ก่อน
  // reqs = this.httpClient.get<Requirment[]>('http://localhost:3000/requirements');

  // Signal
  // reqs = toSignal(this.httpClient.get<Requirment[]>('http://localhost:3000/requirements'))

  // constructor(){
  //   console.log('in constructor')
  //   const url = 'http://localhost:3000/requirements'
  //   this.httpClient
  //     .get<Requirment[]>(url)
  //     .subscribe(data => this.reqs =data)
  // }

  // constructor(){
  //   this.requirmentService.list()
  //   .subscribe((data) => (this.reqs = data)
  //   )}
  // }

  constructor() {
    this.requirmentService.list().subscribe((data) => {
      this.reqs = data;
      this.filtered = this.reqs;
    });

    //ถ้ามีการเปลี่ยนค่า
    this.searchBox.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(), //กันพิมพ์หรือ ต้องหยุดพิมพ์
        tap((v) => console.log(v)) //เอาค่าออกมา
      )
      .subscribe((keyword) => {
        //ให้ทำอะไร
        this.filtered = this.reqs.filter((req) => req.title.includes(keyword));
      });
  }
}
