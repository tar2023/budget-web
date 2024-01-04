import { Routes } from '@angular/router';

// import { RequirementEntryComponent } from './features/budget/pages/requirement-entry/requirement-entry.component';
import  RequirementEntryComponent  from './features/budget/pages/requirement-entry/requirement-entry.component';

export const routes: Routes = [
    // { path: 'budget/requirments', component:RequirementEntryComponent }

    // ถ้าเข้า path นี้ค่อยเข้าไปโหลดไฟล์ RequirementEntry มา

//     { path: 'budget/requirments', 
//     loadComponent :() =>
//      import('./features/budget/pages/requirement-entry/requirement-entry.component'
//      ).then((c) => c.RequirementEntryComponent), 
// },

// กรณี ตั้ง export default class  RequirementEntryComponent 
// { path: 'budget/requirments', 
// loadComponent :() =>
//  import('./features/budget/pages/requirement-entry/requirement-entry.component'
//  )
// },

// { path: 'budget/requirments/add', 
// loadComponent :() =>
//  import('./features/budget/pages/requirement-form/requirement-form.component'
//  )
// },

{ path: 'budget', loadChildren:() => import('./features/budget/budget.routes')}
];
