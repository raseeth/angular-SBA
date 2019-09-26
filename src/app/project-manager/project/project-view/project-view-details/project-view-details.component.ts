import { Component, OnInit, Input } from '@angular/core';
import { ProjectDetailViewModel } from '../../project-details.vm';
import { ProjectService } from '../../../service/project/project.service';
import { ListenerService } from '../../../service/listener/listener.service';

@Component({
  selector: 'app-project-view-details',
  templateUrl: './project-view-details.component.html'
})
export class ViewProjectDetailsComponent implements OnInit {

  @Input() projectDetails: ProjectDetailViewModel;
  
  constructor(private projectService: ProjectService, private listener: ListenerService) { }

  ngOnInit() {
  }  
  
  onDelete(id: string): void {
    this.projectService.delete(id).subscribe(x => this.listener.publish("refresh projects"));
  }
}
