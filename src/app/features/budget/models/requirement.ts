
export enum RequirementStatus{
APROVED = 'APROVED', REJECT ='REJECT', PENDING ='PENDING'
}



export interface Requirement{
    id?: number;
    title : string;
    contactMobileNo :string;
    status : RequirementStatus;
  }
