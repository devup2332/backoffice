import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CloseSidebarAction, OpenSidebarAction } from './sidebar.actions';

export class SidebarStateModel {
  open: boolean;
}

const defaults = {
  open: false,
};

@State<SidebarStateModel>({
  name: 'sidebar',
  defaults,
})
@Injectable()
export class SidebarState {
  @Selector()
  static sidebar(state: SidebarStateModel) {
    return state.open;
  }
  @Action(OpenSidebarAction)
  openSidebar({ getState, setState }: StateContext<SidebarStateModel>) {
    setState({ open: true });
  }
  @Action(CloseSidebarAction)
  closeSidebar({ getState, setState }: StateContext<SidebarStateModel>) {
    setState({ open: false });
  }
}
