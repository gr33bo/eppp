Ext.define('TestApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
      stores: ['QuestionStore'],
      models: ['Question'],
      refs: {
        main: 'main',
        aboutPanel: 'aboutpanel',
        explanationPanel: 'explanationpanel',
        questionPanel: 'questionpanel',
        answerList: '#answer-container'
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
        'explanationpanel button[action=close]': {
	    tap: function(button) {
              this.getExplanationPanel().hide();
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
          tap: function(button){
//            conso
            console.log(this);
            if(button.getText() == "Skip Question"){
              Ext.Msg.confirm("Confirm", "Are you sure you wish "+
                "to skip this question?", function(btn){
                  if(btn == "yes"){
                    this.loadNextQuestion();
                  }
                }, this);
              } else {
                this.loadNextQuestion();
              }
          }
        }, 
        'questionpanel button[action=report-question]': {
          tap: function(button){
            var questionPanel = this.getQuestionPanel(),
                currentRecord = questionPanel.record;

            Ext.Msg.confirm("Confirm", "Are you sure you wish "+
              "to report a problem this question?", function(btn){
                if(btn == "yes"){
                  Ext.Ajax.request({
                      url: domain+'/report_question',
                      params: {
                          id: currentRecord.get("id")
                      },
                      success: function(response){
                        Ext.Msg.alert("Thank you for your report");
                        this.loadNextQuestion();
                      },
                      scope: this
                  });

                }
              }, this);
          }
        }, 
        'questionpanel button[action=submit-answer]': {
          tap: function(){
            var answerList = this.getAnswerList(),
                answers = answerList.getValues(),
                questionPanel = this.getQuestionPanel(),
                currentRecord = questionPanel.record;
        
            if(questionPanel.correctAnswerId){
              if(answers["answer"]){
                if(answers["answer"] == questionPanel.correctAnswerId){
                  Ext.Msg.alert("Correct!", "You selected the right answer!");
                } else {
                  Ext.Msg.alert("Incorrect!", "Sorry, that was not correct");
                }
                questionPanel.down("button[action=submit-answer]").hide();
                questionPanel.down("button[action=skip-question]").setText("Next Question");
                questionPanel.down("button[action=view-explanation]").show();
              } else {
                Ext.Msg.alert("Oops", "Please select an answer, then submit");
              }
            } else {
              Ext.Msg.alert("Error", "Sorry, it appears the system does not know the correct answer.<br/>"+
                      "This question has been automatically reported.");
              Ext.Ajax.request({
                  url: domain+'/report_question',
                  params: {
                      id: currentRecord.get("id")
                  },
                  success: function(response){
//                    Ext.Msg.alert("Thank you for your report");
//                    this.loadNextQuestion();
                  },
                  scope: this
              });
              
              this.loadNextQuestion();
            }
          }
        }, 
        'questionpanel button[action=view-explanation]': {
          tap: function(){
            var questionPanel = this.getQuestionPanel(),
                currentRecord = questionPanel.record;
        
            
            var explanationPanel = this.getExplanationPanel();
            if(!explanationPanel){
              explanationPanel = Ext.Viewport.add(Ext.create('TestApp.view.ExplanationPanel', {id: 'explanation-panel'}));
            }
            Ext.get("answer-explanation").dom.innerHTML = currentRecord.get("answer_explanation");
            explanationPanel.show();
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
    loadNextQuestion: function(){      
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