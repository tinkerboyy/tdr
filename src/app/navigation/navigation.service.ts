import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  constructor() {}

  menuItems: any = [
    {
      label: 'Home',
      icon: 'fa fa-home',
      link: '',
      id: 'menu-item-home',
      routerLink: 'v2/home'
    },
    {
      label: 'Reporting',
      icon: 'fa fa-upload',
      id: 'menu-item-reporting',
      items: [
        {
          label: 'Form Entry',
          routerLink: 'v2/sales',
          id: 'menu-item-form-entry'
        },
        {
          label: 'File Upload',
          link: 'data_upload.html',
          id: 'menu-item-file-upload'
        },
        {
          label: 'Closeout Sales Data',
          link: 'data_entry.html?status=closeout',
          id: 'menu-item-closeout-sales-data'
        },
        {
          label: 'Closeout Sales Data by File Upload',
          link: 'upload_data.html?status=closeout',
          id: 'menu-item-closeout-sales-data-upload'
        },
        {
          label: 'Adjust Data',
          link: 'data_entry.html?status=adjust',
          id: 'menu-item-adjust-ui'
        },
        {
          label: 'Adjust Data by File Upload',
          link: 'upload_data.html?status=adjust',
          id: 'menu-item-adjust-file-upload'
        },
        {
          label: 'Upload Supporting Documents',
          link: 'upload-supporting-docs.html',
          id: 'menu-item-upload-supporting-documents'
        },
        {
          label: 'View Supporting Documents',
          link: 'upload-supporting-docs.html?status=view',
          id: 'menu-item-view-supporting-documents'
        },
        {
          label: 'Download Template',
          link:
            'vendoruser/service/templateProvider/download?filename=template.xlsx',
          id: 'menu-item-template-download'
        }
      ]
    },
    {
      label: 'Payment',
      icon: 'fa fa-dollar',
      id: 'menu-item-payment',
      items: [
        {
          label: 'Make Payments',
          link: 'payment.html',
          id: 'menu-item-make-payment'
        },
        {
          label: 'View Payments',
          link: 'vendor_search.html',
          id: 'menu-item-view-payment'
        }
      ]
    },
    {
      label: 'Program Management',
      icon: 'fa fa-gear',
      id: 'menu-item-program-management',
      items: [
        {
          label: 'View Contract Details',
          link: 'contract-details.html',
          id: 'menu-item-view-contract-details'
        },
        {
          label: 'Manage Task Orders',
          link: 'manage_task_orders.html',
          id: 'menu-item-view-task-order'
        },
        {
          label: 'Upload Contract Documents',
          link: 'upload-contract-docs.html',
          id: 'menu-item-upload-contract-documents'
        },
        {
          label: 'View Contract Documents',
          link: 'upload-contract-docs.html?status=view',
          id: 'menu-item-view-contract-documents'
        },
        {
          label: 'Request Administrative Closeout',
          link: 'contract-closeout.html',
          id: 'menu-item-request-closeout'
        }
      ]
    },
    {
      label: 'Search',
      icon: 'fa fa-search',
      link: 'vendor_search.html',
      id: 'menu-item-search'
    },
    {
      label: 'Help',
      icon: 'fa fa-question-circle',
      items: [
        {
          label: 'Online User Manual',
          link: '/usermanual/TDR.htm',
          id: 'menu-item-user-manual'
        },
        {
          label: 'Tutorial',
          link: '/portal/training/',
          id: 'menu-item-tutorial'
        }
      ]
    }
  ];

  getMenuItems() {
    return this.menuItems;
  }
}
