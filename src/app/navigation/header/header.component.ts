import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
  ChangeDetectionStrategy,
  HostListener,
  OnChanges
} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  menuOpened: boolean = false;
  private modelRef: BsModalRef;

  @Input() servertime: any;
  @Input() displayName: any;
  @Output() sidenavToggle = new EventEmitter<void>();

  @ViewChild('logoutConfirmationModal') logoutConfirmationModal;

  // Toggle side nav for smaller screens
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowSize = event.target.innerWidth;
    if (windowSize < 768) {
      this.menuOpened = true;
    } else {
      this.menuOpened = false;
    }
  }

  constructor(
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  // emit sidenavToggle to parent component
  onToggleSidenav() {
    this.sidenavToggle.emit();
    this.menuOpened = !this.menuOpened;
  }

  ngOnChanges(changes: SimpleChanges) {}

  // Show logout modal
  showLogoutModal() {
    this.modelRef = this.modalService.show(this.logoutConfirmationModal);
  }

  // Hide logout modal
  hideModal() {
    this.modelRef.hide();
  }

  // Call logout api and redirect to portal
  confirmLogout() {
    this.authService.logOut().subscribe(response => {
      window.location.assign(
        '/Shibboleth.sso/SpecialLogout?return=/index.html'
      );
    });
  }
}
