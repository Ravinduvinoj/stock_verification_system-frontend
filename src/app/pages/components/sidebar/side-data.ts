export const adminData = [
     {
          routeLink: 'items',
          icon: 'fas fa-home',
          Label: 'Items'
     },
     {
          routeLink: 'stock-adjustemnt',
          icon: 'fad fa-layer-plus',
          Label: 'Stock Adjustemnt'
     },
     {
          routeLink: 'manual-scan',
          icon: 'fad fa-file-search',
          Label: 'manual scan'
     },
     {
          icon: 'far fa-cog',
          Label: 'Settings',
          children: [
               {
                    routeLink: 'settings/company',
                    Label: 'Company',
                    icon: 'fas fa-building'
               },
               {
                    routeLink: 'settings/category',
                    Label: 'Category',
                    icon: 'fas fa-list'
               },
               {
                    Label: 'Stores',
                    icon: 'fas fa-store',
                    children: [
                         {
                              routeLink: 'settings/stores/main-store',
                              Label: 'Main Store',
                              icon: 'fas fa-warehouse'
                         },
                         {
                              routeLink: 'settings/stores/sub-store',
                              Label: 'Sub Store',
                              icon: 'fas fa-store-alt'
                         },
                         {
                              routeLink: 'settings/stores/island',
                              Label: 'Island',
                              icon: 'fas fa-island-tropical'
                         }
                    ]
               }
          ]
     }
];