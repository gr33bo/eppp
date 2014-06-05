Ext.define('TestApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    alias: 'widget.main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
       // tabBarPosition: 'bottom',
        itemId: "main",
        layout: 'card',
        id: 'blah',
        items: [
            {
                title: 'Home',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,
                layout: {
                  type: 'vbox',
                  pack: 'start',
                  align: 'center'
                },

                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'EPPP Practise App'
                  },
                  {
                    html: "Welcome person",
                    itemId: "welcome-message",
                    hidden: true
                  },
                  {
                    xtype: 'button',
                    text: 'About',
                    action: 'about',
                    margin: '0 0 20 0',
                    width: '75%'
                  },
                  {
                    xtype: 'button',
                    text: 'Last Updated: ',
                    action: 'last-updated',
                    margin: '0 0 20 0',
                    width: '75%'
                  },
                  {
                    xtype: 'button',
                    text: 'Register/Sign in',
                    action: 'register',
                    margin: '0 0 20 0',
                    width: '75%'
                  },
                  {
                    xtype: 'button',
                    text: 'Practise Questions',
                    action: 'practise',
                    width: '75%'
//                  },
//                  {
//                    xtype: 'button',
//                    text: 'Timed Tests',
//                    action: 'timed-tests'
                  }
                ]
            },
            {
                title: 'Practise Questions',
                xtype: 'questionpanel'
            }
        ]
    }
});
