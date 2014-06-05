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
        accountPanel: 'accountpanel',
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
        'main button[action=register]' : {
	    tap: function(button) {
              var accountPanel = this.getAccountPanel();
              if(!accountPanel){
                accountPanel = Ext.Viewport.add(Ext.create('TestApp.view.AccountPanel', {id: 'account-panel'}));
              }
              accountPanel.show();
	    }
	},
        'accountpanel button[action=go-to-register]': {
	    tap: function(button) {
              var accountPanel = this.getAccountPanel();
                  accountPanel.down("#sign-in-explanation").hide();
                  accountPanel.down("#register-explanation").show();
                  accountPanel.down("#go-to-register").hide();
                  accountPanel.down("#go-to-sign-in").show();
                  accountPanel.down("button[action=go-to-register]").hide();
                  accountPanel.down("button[action=go-to-sign-in]").show();
                  accountPanel.down("button[action=sign-in]").hide();
                  accountPanel.down("button[action=register]").show();
                  
                  accountPanel.down("#password-confirmation").show();
                  
                  accountPanel.down("titlebar").setTitle("Register");
                  
            }
        },
        'accountpanel button[action=go-to-sign-in]': {
	    tap: function(button) {
              var accountPanel = this.getAccountPanel();
                  accountPanel.down("#sign-in-explanation").show();
                  accountPanel.down("#register-explanation").hide();
                  accountPanel.down("#go-to-register").show();
                  accountPanel.down("#go-to-sign-in").hide();
                  accountPanel.down("button[action=go-to-register]").show();
                  accountPanel.down("button[action=go-to-sign-in]").hide();
                  accountPanel.down("button[action=sign-in]").show();
                  accountPanel.down("button[action=register]").hide();
                  
                  accountPanel.down("#password-confirmation").hide();
                  
                  accountPanel.down("titlebar").setTitle("Sign In");
                  
            }
        },
        'accountpanel button[action=close]': {
	    tap: function(button) {
              this.getAccountPanel().hide();
            }
        },
        'accountpanel button[action=register]': {
	    tap: function(button) {
              var accountPanel = this.getAccountPanel(),
                  userField = accountPanel.down("textfield"),
                  passField = accountPanel.down("#password"),
                  confField = accountPanel.down("#password-confirmation");
          
              
              if(userField.getValue().trim().length == 0){
                Ext.Msg.alert("Error", "Username must be at least 1 character long");
              } else if(passField.getValue().trim().length < 6){
                Ext.Msg.alert("Error", "Password must be at least 6 characters long");
              } else if(passField.getValue().trim() != confField.getValue().trim()){
                Ext.Msg.alert("Error", "Password and confirmation do not match");
              } else {
                Ext.Ajax.request({
                  url: domain+'/register',
                  method: "POST",
                  params: {
                    username: userField.getValue().trim(),
                    password: passField.getValue().trim()
                  },
                  success: function(response){
                    var decoded = Ext.decode(response.responseText);
                    
                    if(decoded.success){
                      userId = decoded.account_id;
                      userName = decoded.username;
                      var mainView=  this.getMain(),
                          welcomeContainer = mainView.down("#welcome-message");

                      welcomeContainer.setHtml("<b>Welcome "+userName+"</b>");
                      welcomeContainer.show();
                      this.getAccountPanel().hide();
                    } else {
                      Ext.Msg.alert("Error", decoded.message);
                    }
                  },
                  scope: this
                });
              }
            }
        },
        'accountpanel button[action=sign-in]': {
	    tap: function(button) {
              var accountPanel = this.getAccountPanel(),
                  userField = accountPanel.down("textfield"),
                  passField = accountPanel.down("#password");
          
              
              if(userField.getValue().trim().length == 0){
                Ext.Msg.alert("Error", "Please enter a username");
              } else if(passField.getValue().trim().lengt == 0){
                Ext.Msg.alert("Error", "Please enter a password");
              } else {
                Ext.Ajax.request({
                  url: domain+'/sign_in',
                  method: "POST",
                  params: {
                    username: userField.getValue().trim(),
                    password: passField.getValue().trim()
                  },
                  success: function(response){
                    var decoded = Ext.decode(response.responseText);
                    
                    if(decoded.success){
                      userId = decoded.account_id;
                      userName = decoded.username;
                      var mainView=  this.getMain(),
                          welcomeContainer = mainView.down("#welcome-message");

                      welcomeContainer.setHtml("<b>Welcome "+userName+"</b>");
                      welcomeContainer.show();
                      this.getAccountPanel().hide();
                    } else {
                      Ext.Msg.alert("Error", decoded.message);
                    }
                  },
                  scope: this
                });
              }
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
              Ext.Viewport.setMasked({
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


            Ext.Msg.prompt(
                'Report Question',
                'Please let me know why you are reporting this question',
                function (buttonId, value) {
                  if(buttonId == "ok"){
                    if(!value){
                      Ext.Msg.alert("Error","Cannot report a question without a reason");
                    } else {
                      Ext.Ajax.request({
                          url: domain+'/report_question',
                          params: {
                              question_id: currentRecord.get("id"),
                              reason: value
                          },
                          success: function(response){
                            Ext.Msg.alert("Thank you for your report");
                            this.loadNextQuestion();
                          },
                          scope: this
                      });
                    }
                  }
                },
                this,
                true,
                null,
                {
                    autoCapitalize: true,
                    placeHolder: 'Enter reason here'
                }
            );
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
                console.log(answers["answer"])
                Ext.each(currentRecord.data.answers, function(ans, i){
                  var item = answerList.items.items[i];
                  if(item && ans){
                    if(ans.is_correct_answer){
                      item.setLabelCls("green-label");
                    } else if(ans.id == answers["answer"]) {
                      item.setLabelCls("red-label");
                    }
                  }
                });
                
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
                      question_id: currentRecord.get("id"),
                      reason: "Does not know correct answer"
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

        Ext.Viewport.setMasked(false);
        
      }
    },
    loadNextQuestion: function(){      
      var questionPanel = this.getQuestionPanel(),
          currentRecord = questionPanel.record,
          questionStore = Ext.getStore("QuestionStore");

      var total = questionStore.getCount();
      var index = questionStore.findExact('id', currentRecord.get("id"));

      if(index == total-1){
        Ext.Viewport.setMasked({
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