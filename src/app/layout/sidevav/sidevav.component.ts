import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { ModuleService } from '../../core/services/sinapptic/module.service';
import { IModulo } from '../../core/interfaces/sinapptic/modulo';

@Component({
  selector: 'app-sidevav',
  templateUrl: './sidevav.component.html',
  styleUrl: './sidevav.component.css'
})
export class SidevavComponent {
  
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 25}, (_, i) => `Nav Item ${i + 1}`);
  modulesWithComponents?:IModulo[];
  fillerContent = Array.from(
    {length: 20},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );
  fillerIcon = Array.from({length: 20}, () => ('arrow_drop_down'));

  private _mobileQueryListener: () => void;

  constructor(private moduleServie:ModuleService) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }
 ngOnInit(): void {
  this.moduleServie.getModules().subscribe((modulesWithComponents)=>{this.modulesWithComponents=modulesWithComponents})

  
}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
