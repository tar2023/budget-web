import { RequirementStatus } from './../../models/requirement';
import { CommonModule, JsonPipe, Location } from '@angular/common';
import { RequirementService } from '../../services/requirment.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

function isTHMobile(MobbileNo: string): boolean {
  return /^(06|08|09)/.test(MobbileNo);
}

const thMobile = (c: AbstractControl): ValidationErrors | null => {
  // return {thMobile:true}
  return isTHMobile(c.getRawValue()) ? null : { thMobile: true };
};

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './requirement-form.component.html',
  styleUrl: './requirement-form.component.css',
})
export default class RequirementFormComponent {
  //formBuilder
  fb = inject(NonNullableFormBuilder);

  //route
  route = inject(ActivatedRoute);

  // title = new FormControl<string>('',{nonNullable:true});
  // title = this.fb.control<string>('Sticker 6 units');
  title = this.fb.control<string>('', { validators: Validators.required });
  // contactMobileNo = this.fb.control<string>('099999999');
  contactMobileNo = this.fb.control<string>('', {
    validators: [Validators.required, thMobile, Validators.maxLength(10)],
  });

  // forGroup
  fg = this.fb.group({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
  });

  id: number | null = null;

  constructor() {
    // this.title.disable();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('id', this.id);
    //id is has value => edit mode
    if (this.id) {
      // get detail to formGroup
      this.reqService.get(this.id).subscribe((req) => this.fg.patchValue(req));
    }
  }

  // requirement service
  reqService = inject(RequirementService);

  onSubmit(): void {
    // const submitReq = this.fg.getRawValue();
    // const submitReq = {...this.fg.getRawValue(), status:'PENDING'};
    const submitReq = {
      ...this.fg.getRawValue(),
      status: RequirementStatus.PENDING,
    };
    if (this.id) {
      // this.reqService.edit(submitReq, this.id).subscribe((v)=>console.log);
      this.reqService.edit(submitReq, this.id).subscribe(() => this.onBack());
    } else {
      // this.reqService.add(this.fg.getRawValue()).subscribe((v) => console.log);
      // this.reqService.add(this.fg.getRawValue()).subscribe(() => this.onBack());
      this.reqService.add(submitReq).subscribe(() => this.onBack());
    }
  }

  //location
  location = inject(Location);
  onBack(): void {
    this.location.back();
  }
}
