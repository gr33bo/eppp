Ext.define('TestApp.view.AboutPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.aboutpanel',
    config: {
      modal: true,
      centered: true,
      width: "40%",
      height: "60%",
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
          html: '<h1>About This App</h1>'+
            '<p>The questions & answers for this application were '+
            'taken from pdfs and word documents, many from scans. As '+
            'such, there may be garbled, incomplete or missing data. If '+
            'you encounter any such thing, click the "Report" button '+
            'to let me know (this will also skip the question).</p>'+
            '<p><b>Practise questions</b> will randomly select 100 questions. There are options that '+
            'will let you toggle whether or not you wish to see questions that you '+
            'have seen before as well as only seeing questions you got incorrect before.</p>'+
            '<p><b>Timed Tests</b> (coming soon) will administer a complete exam\'s worth of questions '+
            'and record your time. Tests can be paused but the app will note which tests '+
            'were completed without pausing vs with.</p>'+
            '<p><b>Statistics</b> (available after your first timed test) will '+
            'contain your timed test history</p>'

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