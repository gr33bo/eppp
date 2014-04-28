Ext.define('TestApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
      stores: ['QuestionStore'],
      models: ['Question'],
      refs: {
        main: 'main',
        aboutPanel: 'aboutpanel',
        explanationPanel: 'explanationpanel',
        questionPanel: 'questionpanel'
      },
      control: {
        'button[action=home]' : {
          tap: function(button){
            this.getMain().setActiveItem(0);
          }
        },
        'main button[action=about]' : {
	    tap: function(button) {
              var aboutPanel = this.getAboutPanel();
              if(!aboutPanel){
                aboutPanel = Ext.Viewport.add(Ext.create('TestApp.view.AboutPanel', {id: 'about-panel'}));
              }
              aboutPanel.show();
	    }
	},
        'aboutpanel button[action=close]': {
	    tap: function(button) {
              this.getAboutPanel().hide();
            }
        },
        'main button[action=practise]' : {
	    tap: function(button) {
              var questionStore = Ext.getStore("QuestionStore");
              this.getMain().setMasked({
                                        message: 'Please Wait..',
                                        indicator: true
                                      });
              questionStore.load();
              
	    }
	}, 
        'questionpanel button[action=skip-question]': {
//          tap: 'loadNextRecord'
          tap: function(){
            Ext.Msg.confirm("Confirm", "Are you sure you wish "+
              "to skip this question?", function(btn){
                if(btn == "yes"){
                  this.loadNextRecord();
                }
              }, this);
          }
        }
      }
    },
    init: function(){
      var questionStore = Ext.getStore("QuestionStore");
      questionStore.on("load", this.questionStoreLoad, this);
    },
    questionStoreLoad: function(store, records){
      if(records.length > 0){
        this.getQuestionPanel().loadQuestion(records[0]);

        this.getMain().setActiveItem(1);

        this.getMain().setMasked(false);
        
      }
    },
    loadNextRecord: function(){      
      var questionPanel = this.getQuestionPanel(),
          currentRecord = questionPanel.record,
          questionStore = Ext.getStore("QuestionStore");

      var total = questionStore.getCount();
      var index = questionStore.findExact('id', currentRecord.get("id"));

      if(index == total-1){
        this.getMain().setMasked({
                                  message: 'Please Wait..',
                                  indicator: true
                                });
        questionStore.load();

      } else {
        var nextRecord = questionStore.getAt(index+1);
        questionPanel.loadQuestion(nextRecord);
      }
    }
});