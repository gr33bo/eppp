Ext.define('TestApp.view.ExplanationPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.explanationpanel',
    config: {
      modal: true,
      centered: true,
      width: "90%",
      height: "90%",
      styleHtmlContent: true,
      style: 'opacity: 0.95;',
      itemId: 'about-app',

      layout: 'auto',
          scrollable: {
              direction: 'vertical',
              directionLock: true
          },
      items: [
        {
          xtype: 'component',
          margin: '20 0 0 0',
          cls: 'modal-copy-align',
          html: '<h1>Answer Explanation</h1>'+
            '<p id="answer-explanation"></p>'

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