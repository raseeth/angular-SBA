import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { ProjectDetailViewModel } from '../project-details.vm';

import { ProjectService } from '../../service/project/project.service';
import { ListenerService } from '../../service/listener/listener.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html'
})
export class ViewProjectComponent implements OnInit {

  projects: ProjectDetailViewModel[];
  filteredProjects: ProjectDetailViewModel[];
  searchTerm: string;

  constructor(private projectService: ProjectService, 
    private listnerService: ListenerService) { }

  ngOnInit() {
    this.listnerService.listener().subscribe(x => {
      this.refreshProjects();
    });

    this.refreshProjects();
  }

  private refreshProjects(): void {
    this.projectService.get().subscribe(x => {
      this.filteredProjects = x;
      this.projects = x;
    });
  }

  sortBy(prop: string): void {
    this.filteredProjects =  _.sortBy(this.filteredProjects, prop);
  }

  onSearchTermChange(term: string): void {
    this.filteredProjects = term ? this.projects.filter((x: ProjectDetailViewModel) => {  
           return (x.endDate ? (x.endDate.toLowerCase().indexOf(term.toLowerCase()) > -1) : false)
            || (x.startDate ? (x.startDate.toLowerCase().indexOf(term.toLowerCase()) > -1) : false)
            || x.name.toLowerCase().indexOf(term.toLowerCase()) > -1
            || x.priority.toString().toLowerCase().indexOf(term.toLowerCase()) > -1;            
    }) : this.projects;
  }
}
