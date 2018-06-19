import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('dataStudentTable') studentdataTable: DataTable;
  @ViewChild('studentpaginator') studentpaginator: Paginator;

  @ViewChild('dataStaffTable') staffdataTable: DataTable;
  @ViewChild('staffpaginator') staffpaginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;
  primengDatatableHelperStaff: PrimengDatatableHelper;
  isAdmin: boolean = false;
  showUpdateUserSidebar :boolean = false;
  userProfileDetails : any;

  constructor(private userService:UserService) { 
    this.primengDatatableHelper = new PrimengDatatableHelper();
    this.primengDatatableHelperStaff = new PrimengDatatableHelper();
  }

  ngOnInit() {  
    this.primengDatatableHelper.resizableColumns = true;
    this.primengDatatableHelperStaff.resizableColumns = true;
    this.isAdmin = this.userService.CurrentUserRoleId == 1 || this.userService.CurrentUserRoleId == 2
  }
  
  getAllStudents(event?: LazyLoadEvent) {

    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.studentpaginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();
    let pageIndex = this.primengDatatableHelper.getPageIndex(this.studentpaginator, event);
    let pageSize = this.primengDatatableHelper.getMaxResultCount(this.studentpaginator, event);
    this.userService.getAllStudents(pageIndex,pageSize)
      .subscribe(res => {
        debugger;
        if (res) {
          this.primengDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelper.records =res;
          this.primengDatatableHelper.hideLoadingIndicator();
        }
        else {
          this.primengDatatableHelper.records = null;
        }
      })
  }
  
  getAllStaffs(event?: LazyLoadEvent) {

    if (this.primengDatatableHelperStaff.shouldResetPaging(event)) {
      this.staffpaginator.changePage(0);

      return;
    }
    this.primengDatatableHelperStaff.showLoadingIndicator();
    let pageIndex = this.primengDatatableHelperStaff.getPageIndex(this.staffpaginator, event);
    let pageSize = this.primengDatatableHelperStaff.getMaxResultCount(this.staffpaginator, event);
    this.userService.getAllStaffs(pageIndex,pageSize)
      .subscribe(res => {
        debugger;
        if (res) {
          this.primengDatatableHelperStaff.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelperStaff.records =res;
          this.primengDatatableHelperStaff.hideLoadingIndicator();
        }
        else {
          this.primengDatatableHelperStaff.records = null;
        }
      })
  }

  showUserProfile(userId :number)
  {
    this.userService.getUserProfile(userId).subscribe(data=>{
      this.userProfileDetails = data;
      this.showUpdateUserSidebar = true;
    },error=>{

    });
  }
}
