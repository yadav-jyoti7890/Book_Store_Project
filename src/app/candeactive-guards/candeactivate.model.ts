export interface CanDeactivateInterface {
  canDeactivate: () => boolean | Promise<boolean>;
}
