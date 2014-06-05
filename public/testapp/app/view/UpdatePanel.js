Ext.define('TestApp.view.UpdatePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.updatepanel',
    config: {
      modal: true,
      centered: true,
      width: "90%",
      height: "90%",
      styleHtmlContent: true,
      style: 'opacity: 0.95;',
//      itemId: 'about-app',

      layout: 'auto',
          scrollable: {
              direction: 'vertical',
              directionLock: true
          },
      items: [
        {
          docked: 'top',
          xtype: 'titlebar',
          title: 'Updates'
        },
        {
          xtype: 'container',
          margin: '20 0 0 0',
          cls: 'modal-copy-align',
          flex: 1,
          itemId: 'updates-container'

        },
        {
          docked: 'bottom',
          xtype: 'toolbar',
          layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'center'
          },
          items: [
            {
                text: 'CLOSE',
                action: 'close',
                flex: 1
            }
          ]
        }
      ]
    }
});