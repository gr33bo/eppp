Ext.define('TestApp.view.AboutPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.aboutpanel',
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
          html: '<h1>About This App</h1>'+
            '<p>The questions & answers for this application were '+
            'taken from pdfs and word documents, many from scans. As '+
            'such, there may be garbled, incomplete or missing data. If '+
            'you encounter any such thing, click the "Report" button '+
            'to let me know.<br/>'+
            'Every question should have 4 answers, if there is more or less '+
            'than 4 answers for a question, then please report it.<br/>'+
            '<u>Reporting a question will also skip it</u></p>'+
            '<p><b>Practise questions</b> will randomly select 20 questions to '+
            'be loaded onto your device. Once you answer all 20 it will pull in '+
            'the next (random) 20. This app requires an active internet connection!<br/>'+
            'Select an answer for a question and hit the Submit button, the app '+
            'will inform you whether or not you got the answer correct and will '+
            'alter the buttons at the bottom to include one that will let you read '+
            'the explanation for the answer.<br/>'+
            'You may also skip a question if you wish. Right now this has little '+
            'practical purpose (beyond skipping) but in a future release the app will start tracking '+
            'which questions you got right and will offer you the option of only repeating '+
            'the questions you got wrong or skipped.</p>'
            
//            '<p><b>Practise questions</b> will randomly select 20 questions at a time. There are options that '+
//            'will let you toggle whether or not you wish to see questions that you '+
//            'have seen before as well as only seeing questions you got incorrect before.</p>'+
//            '<p><b>Timed Tests</b> (coming soon) will administer a complete exam\'s worth of questions '+
//            'and record your time. Tests can be paused but the app will note which tests '+
//            'were completed without pausing vs with.</p>'+
//            '<p><b>Statistics</b> (available after your first timed test) will '+
//            'contain your timed test history</p>'

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