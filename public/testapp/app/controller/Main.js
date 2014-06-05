Ext.define('TestApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
      stores: ['QuestionStore', 'UpdateStore'],
      models: ['Question', 'Update'],
      refs: {
        main: 'main',
        aboutPanel: 'aboutpanel',
        explanationPanel: 'explanationpanel',
        questionPanel: 'questionpanel',
        accountPanel: 'accountpanel',
        answerList: '#answer-container',
        updatePanel: 'updatepanel',
        updateButton: 'main button[action=updates]'
      },
      control: {
        'button[action=home]' : {
          tap: function(button){
            this.getMain().setActiveItem(0);
          }
        },
//        'main button[action=previous-answers]' : {
//	    tap: function(button) {
//              if(!userId){
//                Ext.Msg.alert("Please sign in to see previous answers");
//              } else {                
//                var previousQuestionStore = Ext.getStore("PreviousQuestionStore");
//                
//                
//                Ext.Viewport.setMasked({
//                              message: 'Please Wait..',
//                              indicator: true
//                            });
//                previousQuestionStore.load();
//              }
//	    }
//	},
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
        'main button[action=updates]' : {
	    tap: function(button) {
              var updatePanel = this.getUpdatePanel();
              if(!updatePanel){
                updatePanel = Ext.Viewport.add(Ext.create('TestApp.view.UpdatePanel', {id: 'update-panel'}));
              }
              updatePanel.show();
	    }
	},
        'updatepanel button[action=close]': {
	    tap: function(button) {
              this.getUpdatePanel().hide();
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
              if(userId){
                
                Ext.Msg.confirm("View Previous?", "Do you wish to see questions you have answered previously?", 
                  function(btn){
                    var proxy = questionStore.getProxy(),
                        extraParams = proxy.getExtraParams();
                      proxy.setExtraParam("account_id", userId);    
                    if(btn == "no"){    
                      proxy.setExtraParam("ignore_seen", true);                  
                    } else {
                      proxy.setExtraParam("ignore_seen", false);    
                    }
                      
                    
                    Ext.Viewport.setMasked({
                                  message: 'Please Wait..',
                                  indicator: true
                                });
                    questionStore.load();
                  }, this);
              } else {
                Ext.Viewport.setMasked({
                              message: 'Please Wait..',
                              indicator: true
                            });
                questionStore.load();
              }
              
	    }
	}, 
        'questionpanel button[action=skip-question]': {
          tap: function(button){
//            conso
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
                
                if(userId){
                  Ext.Ajax.request({
                    url: domain+'/save_answer',
                    method: "POST",
                    params: {
                      account_id: userId,
                      answer_id: answers["answer"],
                      question_id: currentRecord.get("id")
                    }
                  });
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
      var updateStore = Ext.getStore("UpdateStore");
      questionStore.on("load", this.questionStoreLoad, this);
      updateStore.on("load", this.updateStoreLoad, this);
    },
    questionStoreLoad: function(store, records){
      if(records.length > 0){
        this.getQuestionPanel().loadQuestion(records[0]);
        
        this.getMain().setActiveItem(1);

        Ext.Viewport.setMasked(false);
        
      }
    },
    updateStoreLoad: function(store, records){
      if(records.length > 0){
        this.getUpdateButton().setText("Last Updated: "+records[0].data.created_at);        
        
        var updatePanel = Ext.Viewport.add(Ext.create('TestApp.view.UpdatePanel', {id: 'update-panel', hidden: true}));
        var container = updatePanel.down("#updates-container");
        
        var html = "";
        Ext.each(records, function(record, i){
          var recordHtml = "<p><b>"+record.get("created_at")+"</b><br/>"+record.get("text")+"</p>";
          
          if(i < (records.length-1)){
            recordHtml = recordHtml + "<hr/>";
          }
          
          html = html + recordHtml;
        });
        
        container.setHtml(html);
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