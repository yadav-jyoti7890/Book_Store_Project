// unsaved-changes.guard.ts
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { CanDeactivateInterface } from './candeactivate.model';


export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateInterface> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
