Ext.define('Admin.controller.Update', {
    extend: 'Ext.app.Controller',
    stores: [
      'UpdateStore'
    ],
    refs: [{
      ref: 'grid',
      selector: 'updategrid'
    }, {
      ref: 'form',
      selector: 'updateform'
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
               'updategrid' : {
                    selectionchange :  this.selectUpdate
                },
                'updateform' : {
                    dirtychange : function(form, isDirty) {
                      if(isDirty) {
                        this.getForm().down('button[action=undo]').enable();
                      } else {
                        this.getForm().down('button[action=undo]').disable();
                      }
                    }
                },
                'updategrid button[action=new]': {
                    click: this.newUpdate
                },
                'updateform button[action=update]': {
                    click: this.updateUpdate
                },
                'updateform button[action=create]': {
                    click: this.createUpdate
                },
                'updateform button[action=cancel]': {
                    click: function() {
                       var grid = this.getGrid(),
                           sm = grid.getSelectionModel();
                       grid.enable();
                       sm.select(sm.getLastSelected());
                    }
                },
                'updateform button[action=delete]': {
                    click: this.deleteUpdate
                }

            },
            store: {
                '#UpdateStore': {
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

    showSelectUpdateButtons: function(form) {
        form.down('button[action=update]').show();
        // TODO: the undo button is enabled when a record is selected, it should be disabled
        form.down('button[action=undo]').show();
        form.down('button[action=delete]').show();
        form.down('button[action=create]').hide();
        form.down('button[action=cancel]').hide();        
        
//        form.down('button[action=show-upload-pdf]').show();
    },

    showNewUpdateButtons: function(form) {
        form.down('button[action=update]').hide();
        form.down('button[action=delete]').hide();
        form.down('button[action=undo]').hide();
        form.down('button[action=create]').show();
        form.down('button[action=cancel]').show();
        
//        form.down('button[action=show-upload-pdf]').hide();
    },


    selectUpdate : function(sm, records) {
        var record = sm.getLastSelected(),
            formPanel = this.getForm(),
            form = formPanel.getForm();

        //must check to see if anything is selected, or error occurs when sorting
        //which causes a deselect, then a select (both firing this event).
        if(records.length != 0){
          formPanel.loadRecord(record);

          formPanel.setTitle("Update Details");

          this.showSelectUpdateButtons(formPanel);

        }

        
    },
    newUpdate: function(button) {
        var formPanel = this.getForm(),
            grid = this.getGrid(),
            form = formPanel.getForm();

        grid.getSelectionModel().deselectAll();
        grid.disable();
        
        form.reset(); // this is not properly clearing checkboxgroups

        var newRecord = new Admin.model.Update();


        formPanel.loadRecord(newRecord);
        formPanel.setTitle("New Update");
        this.showNewUpdateButtons(formPanel);
    },

    updateUpdate: function(button) {
        var form = this.getForm(),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
    },

    createUpdate: function() {
        var form = this.getForm(),
            grid = this.getGrid(),
            store = grid.getStore(),
            record = form.getRecord(),
            values = form.getValues();

         record.set(values);
         store.insert(0,record);

    },
    deleteUpdate: function(button) {
        var grid = this.getGrid(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            record = this.getForm().getRecord();

        Ext.Msg.confirm("Confirm", "Are you sure you wish to delete this Update?",
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
    }
});
