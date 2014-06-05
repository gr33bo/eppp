Ext.define('Admin.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'Admin.view.Main'
    ],

    layout: {
        type: 'border'
    },

    items: [
      {
        region: 'center',
        xtype: 'tabpanel',
        items: [
          {
            title: 'Questions',
            xtype: 'panel',
            layout: 'border',
            items: [
              {
    //            html: 'aaaaaaaaaaa',
                xtype: 'questiongrid',
                region: 'center',
                flex: 0.5
              },
              { 
                xtype: 'panel',
                region: 'east',
                flex: 1,
                layout: 'border',
                items: [
                  {
                    xtype: 'questionform',
                    region: 'center',
                    flex: 1
                  },
                  {
                    xtype: 'answergrid',
                    flex: 0.5,
                    region: 'south'
                  }

                ]
              }
            ]
          },
          {
            title: 'Updates',
            xtype: 'panel',
            layout: 'border',
            items: [
              {
    //            html: 'aaaaaaaaaaa',
                xtype: 'updategrid',
                region: 'center',
                flex: 0.5
              },
              { 
                xtype: 'updateform',
                region: 'east',
                flex: 1
              }
            ]
          }
        ]
        
      },
      Ext.create('Ext.ux.StatusBar', {
          id: 'main-status',
          region:'south',

          // defaults to use when the status is cleared:
          defaultText: 'Default status text',
          //defaultIconCls: 'default-icon',
          style: {
             fontSize: '8px',
             color: "#666",
             backgroundColor: "#D8D8D8"
          },

          // values to set initially:
          text: 'Ready',
          iconCls: 'x-status-valid',
          items: ['']
      })
    ]
});
