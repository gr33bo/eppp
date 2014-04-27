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
	}
      }
    },
    init: function(){
      var questionStore = Ext.getStore("QuestionStore");
      questionStore.on("load", this.questionStoreLoad, this);
    },
    questionStoreLoad: function(store, records){
      this.getMain().setActiveItem(1);
      
      this.getMain().setMasked(false);
    },
    test: function(){
      
    }
});