
export const adminData = [//load all admin components
     {
          routeLink: 'items',
          icon: 'fas fa-home',
          Label: 'Items'

     },
     {
          routeLink: 'stock-adjustemnt',
          icon: 'fas fa-layer-group',
          Label: 'Stock Adjustemnt'

     },
     {
          routeLink: 'manual-scan',
          icon: 'fas fa-chalkboard-teacher',
          Label: 'manual scan'

     },
     {
          
          icon: 'fas fa-users-cog',
          Label: 'Settings',
          children: [
               {
                    routeLink: 'settings/company',
                    Label: 'Company',
                    icon: 'fas fa-building'
               },
               {
                    routeLink: 'settings/stores',
                    Label: 'Stores',
                    icon: 'fas fa-store'
               },
               {
                    routeLink: 'settings/category',
                    Label: 'Category',
                    icon: 'fas fa-list'
               }
          ]
     }
]


