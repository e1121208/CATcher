import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';
import { UserService } from '../../core/services/user.service';
import { TABLE_COLUMNS } from '../../shared/issue-tables/issue-tables-columns';
import { ACTION_BUTTONS, IssueTablesComponent } from '../../shared/issue-tables/issue-tables.component';
import { Issue } from '../../core/models/issue.model';

@Component({
  selector: 'app-issues-deleted',
  templateUrl: './issues-deleted.component.html',
  styleUrls: ['./issues-deleted.component.css']
})
export class IssuesDeletedComponent implements OnInit {
  readonly displayedColumns = [TABLE_COLUMNS.NO, TABLE_COLUMNS.TITLE, TABLE_COLUMNS.TYPE, TABLE_COLUMNS.SEVERITY, TABLE_COLUMNS.ACTIONS];
  readonly actionButtons: ACTION_BUTTONS[] = [ACTION_BUTTONS.VIEW_IN_WEB, ACTION_BUTTONS.FIX_ISSUE, ACTION_BUTTONS.RESTORE_ISSUE];

  selectedSeverity = '';
  selectedType = '';
  filter: (issue: Issue) => boolean;

  @ViewChild(IssueTablesComponent, { static: true }) table: IssueTablesComponent;

  constructor(public permissions: PermissionService, public userService: UserService) {}

  ngOnInit() {
    this.filter = (issue: Issue): boolean => {
      const matchesOpen = !issue.isIssueOpened();

      const matchesSeverity = this.selectedSeverity === '' || issue.severity === this.selectedSeverity;
      const matchesType = this.selectedType === '' || issue.type === this.selectedType;

      return matchesOpen && matchesSeverity && matchesType;
    };
  }

  applySearchFilter(filterValue: string) {
    this.table.issues.filter = filterValue;
  }

  applySeverityFilter(severity: string) {
    this.selectedSeverity = severity;
    this.refreshFilter();
  }

  applyTypeFilter(type: string) {
    this.selectedType = type;
    this.refreshFilter();
  }

  refreshFilter() {
    this.table.issues.filter = '';
  }
}
