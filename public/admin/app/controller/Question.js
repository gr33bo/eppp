Ext.define('Admin.controller.Question', {
    extend: 'Ext.app.Controller',
    stores: [
      'QuestionStore', 'AnswerStore'
    ],
    refs: [{
      ref: 'grid',
      selector: 'questiongrid'
    }, {
      ref: 'form',
      selector: 'questionform'
    }, {
      ref: 'examFilter',
      selector: '#exam-filter' 
    }, {
      ref: 'answerGrid',
      selector: 'answergrid'
    }
  ],
    init: function() {
        this.listen({
            global: {
                 //idle: this.onIdle
            },
            controller: {
                 //'*': {
                 //   foobar: this.onAnyFooBar
                 //},
                 //'#foo': {
                 //   bar: this.onFooBar
                // }
            },
            component: {
               'questiongrid' : {
                    selectionchange :  this.selectQuestion
                },
                'questionform' : {
                    dirtychange : function(form, isDirty) {
                      if(isDirty) {
                        this.getForm().down('button[action=undo]').enable();
                      } else {
                        this.getForm().down('button[action=undo]').disable();
                      }
                    }
                },
                'questiongrid button[action=new]': {
                    click: this.newQuestion
                },
                'questionform button[action=update]': {
                    click: this.updateQuestion
                },
                'questionform button[action=create]': {
                    click: this.createQuestion
                },
                'questionform button[action=cancel]': {
                    click: function() {
                       var grid = this.getGrid(),
                           sm = grid.getSelectionModel();
                       grid.enable();
                       sm.select(sm.getLastSelected());
                    }
                },
                'questionform button[action=delete]': {
                    click: this.deleteQuestion
                },
                '#exam-filter': {
                    change: function(combo, newVal, oldVal){
                      var questionStore = this.getQuestionStoreStore(),
                          proxy = questionStore.proxy;
                      proxy.extraParams['exam_id'] = newVal;
                      questionStore.load();
                    }
                },
                'answergrid button[action=new]': {
                    click: this.newAnswer
                },
                'answergrid button[action=delete]': {
                    click: this.deleteAnswer
                }

            },
            store: {
                '#ExamStore': {
                  load: function(store, records) {
                    if(store.getCount() >= 0){
                      var record = records[0];
                      this.getExamFilter().setValue(record.get("id"));
                    } 
                  }
                },
                '#QuestionStore': {
                   load: function(store) {
                     if(store.getCount() >= 0) {
                       this.getGrid().getSelectionModel().select(0);
                     }
                   },
                   write: function(store, operation) {
                       var grid = this.getGrid();
                       switch(operation.action) {
                         case 'create':
                           grid.enable();
                           grid.getSelectionModel().select(operation.getRecords());
                           break;
                         case 'update':
                           break;
                         case 'destroy':
                           break;
                         default:
                       }
                   },
                   changesrejected: function(records) {
                        this.getGrid().getSelectionModel().select(records);
                   }
                }
            }
         });
    },

    showSelectQuestionButtons: function(form) {
        form.down('button[action=update]').show();
        // TODO: the undo button is enabled when a record is selected, it should be disabled
        form.down('button[action=undo]').show();
        form.down('button[action=delete]').show();
        form.down('button[action=create]').hide();
        form.down('button[action=cancel]').hide();        
        
//        form.down('button[action=show-upload-pdf]').show();
    },

    showNewQuestionButtons: function(form) {
        form.down('button[action=update]').hide();
        form.down('button[action=delete]').hide();
        form.down('button[action=undo]').hide();
        form.down('button[action=create]').show();
        form.down('button[action=cancel]').show();
        
//        form.down('button[action=show-upload-pdf]').hide();
    },


    selectQuestion : function(sm, records) {
        var record = sm.getLastSelected(),
            formPanel = this.getForm(),
            form = formPanel.getForm();

        //must check to see if anything is selected, or error occurs when sorting
        //which causes a deselect, then a select (both firing this event).
        if(records.length != 0){
          formPanel.loadRecord(record);

          formPanel.setTitle("Question Details");

          this.showSelectQuestionButtons(formPanel);

          this.getAnswerStoreStore().load({params: {question_id : record.get("id")}});

          this.getAnswerGrid().enable();

        }

        
    },
    newQuestion: function(button) {
        var formPanel = this.getForm(),
            grid = this.getGrid(),
            form = formPanel.getForm();

        grid.getSelectionModel().deselectAll();
        grid.disable();
        this.getAnswerGrid().disable();
        form.reset(); // this is not properly clearing checkboxgroups

        var examId = this.getExamFilter().getValue();

        var newRecord = new Admin.model.Question({exam_id:examId});


        formPanel.loadRecord(newRecord);
        formPanel.setTitle("New Question");
        this.showNewQuestionButtons(formPanel);
    },

    updateQuestion: function(button) {
        var form = this.getForm(),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
    },

    createQuestion: function() {
        var form = this.getForm(),
            grid = this.getGrid(),
            store = grid.getStore(),
            record = form.getRecord(),
            values = form.getValues();

         record.set(values);
         store.insert(0,record);

    },
    deleteQuestion: function(button) {
        var grid = this.getGrid(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            record = this.getForm().getRecord();

        Ext.Msg.confirm("Confirm", "Are you sure you wish to delete this Question?",
          function(btn){
            if(btn == "yes"){
              var recordIndex =  store.indexOf(sm.getLastSelected()),
                  lastIndex = store.getCount() - 1,
                  nextRecordIndex = lastIndex == recordIndex ? lastIndex -1 : recordIndex + 1,
                  nextRecord = store.getAt(nextRecordIndex);

              sm.select(nextRecord);
              store.remove(record);
            }
          }, this);
    },
    newAnswer: function(button) {
        var store = this.getAnswerStoreStore();
        var form = this.getForm(),
            question = form.getRecord();
        var newRecord = new Admin.model.Answer({question_id: question.get("id"), answer_text : "New Answer"});
 
        store.insert(0, newRecord);
    },
    deleteAnswer: function(button) {
        var store = this.getAnswerStoreStore();
        var answerGrid = this.getAnswerGrid(),
            sm = answerGrid.getSelectionModel(),
            selected = sm.getLastSelected();
   
        if(selected){
          Ext.Msg.confirm("Confirm", "Do you wish to delete this answer?", 
	    function(btn){
              if(btn == "yes"){
                store.remove(selected);
              } 
          }, this);
      
        }
 
    }
});
