Ext.define('TestApp.view.QuestionPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.questionpanel',
    config: {

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
          xtype: 'toolbar',
          title: 'Practise Questions',
          items: [
            {
              iconCls: 'home',
              action: 'home',
              left: 0,
              top: 0
            }
          ]
        },
        {
          xtype: 'panel',
          html: 'blah',
          itemId: 'question-container'
        },
        {
          xtype: 'panel',
          itemId: 'answer-container',
          items: []
        }
      ]
    },
    loadQuestion: function(record){
      console.log(record);
    }
});