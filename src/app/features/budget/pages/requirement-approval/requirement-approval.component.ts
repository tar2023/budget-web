import { Component, inject } from '@angular/core';
import { MobileFormatPipe } from '../../../../shared/pipes/mobbile-format.pipe';
import { Requirement } from '../../models/requirement';
import { RequirementService } from '../../services/requirment.service';

@Component({
  selector: 'app-requirement-approval',
  standalone: true,
  imports: [MobileFormatPipe],
  templateUrl: './requirement-approval.component.html',
  styleUrl: './requirement-approval.component.css',
})
export default class RequirementApprovalComponent {

  reqService = inject(RequirementService);

  reqs: Requirement[] = [];

  // constructor() {
  //   this.reqService.list().subscribe((data) => {
  //     this.reqs = data;
  //   });
  // }

  constructor() {
    this.loadRequirement()
  }
 // actionแล้วทำการ load
  private loadRequirement() :void{
    this.reqService.list().subscribe((data) => {
      this.reqs = data;
    });
  }

  onApprove(id:number) : void{
  // this.reqService.approve(id).subscribe(v => console.log) 

  //refresh UI
  // this.reqService.approve(id).subscribe( () => this.loadRequirement())  // ยิง patch แล้วยัง มา loadRequirement อีกรอบ

  this.reqService //partial update ui ไม่จำเป็นต้องยินไปหาตัว api อีกรอบหนึ่ง
   .approve(id) 
   .subscribe(v => { //เอา value ที่ patch ไป มา update
       this.reqs = this.reqs.map(req => req.id ===id?{...req, status:v.status}:{...req})}) 
       // this.reqs ให้อัพเดทด้วยตัวมันเอง เพียงแต่ว่าให่เปลื่ยน status (มาดูสิว่า req.id ตรงกับ id ที่กด approved มา?
       //{ถ้าอันไหนตรง ให้ใช้ ...req แต่ว่า status ให้ใช้เป็นของ v.status ออกมา} : {แต่ถ้าไปตรงกัน ก็เอาของเดิมไป คือ ...req})
  }

  
  onReject(id:number) : void{
    this.reqService.reject(id).subscribe(updated => { //เอา value ที่ patch ไป มา update

      // [1,2,3].map(v => v+1) => [2,3,5]
      // [r1,r2,r3].map(r => updateStatus(r.id)) : Reuirement => [r1(withNewSratus), r2(withNewSratus), r3(withNewSratus)]

      //update match id only
      // [r1,r2,r3].map(r => updateStatus(r.id)) : Reuirement => [r1(withHoldSratus), r2(withNewSratus), r3(withHoldSratus)]
       this.reqs = this.reqs.map(req => {
//update match
        if(req.id === id){
          return {...req, status:updated.status}
        }else{
          return req
        }
       })
      }) 
    }
  
}
