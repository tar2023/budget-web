import { Routes } from '@angular/router';

export const routes: Routes = [

{ path: 'requirments', 
loadComponent :() =>
 import('./pages/requirement-entry/requirement-entry.component')
},

{ path: 'requirments/add', 
loadComponent :() =>
 import('./pages/requirement-form/requirement-form.component')
},

{ path: 'requirments/edit/:id', 
loadComponent :() =>
 import('./pages/requirement-form/requirement-form.component')
},

{ path: 'requirments/approval', 
loadComponent :() =>
 import('./pages/requirement-approval/requirement-approval.component')
},


];

export default routes;
