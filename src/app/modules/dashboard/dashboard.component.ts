import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CloseSidebarAction,
  OpenSidebarAction,
} from 'src/app/ngxs/sidebar/state/sidebar.actions';
import { SidebarState } from 'src/app/ngxs/sidebar/state/sidebar.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}
  @Select(SidebarState.sidebar) openSidebar$: Observable<boolean>;
  open: boolean = false;

  ngOnInit(): void {
    this.openSidebar$.subscribe((res) => {
      this.open = res;
    });
  }

  logOut() {
    console.log('HERE');
    localStorage.removeItem('SANTANDER_TOKEN');
    this.router.navigate(['/signin']);
  }

  openSidebar() {
    if (!this.open) return this.store.dispatch(new OpenSidebarAction());
    return this.store.dispatch(new CloseSidebarAction());
  }
}
