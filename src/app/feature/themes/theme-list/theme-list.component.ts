import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { ITheme } from '../../../core/interfaces';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, AfterViewInit {

  themeList: ITheme[];

  searchControl = new FormControl();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      // filter(searchTerm => searchTerm.length > 3),
      startWith(''),
      debounceTime(400),
      switchMap(searchTerm => this.themeService.loadThemeList(searchTerm))
    )
      .subscribe(themeList => {
      this.themeList = themeList;
    });
    }
  

  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

}
