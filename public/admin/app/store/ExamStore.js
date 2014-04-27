Ext.define('Admin.store.ExamStore', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Exam',
    pageSize: 100,
    autoLoad: true,
    sorters: [{
         property: 'name',
         direction: 'ASC'
    }],

    onCreateRecords: function(records, operation, success) {
       if(!success) {
         this.rejectChanges();
       }
       this.setStatus(operation, success);
    },

    onUpdateRecords: function(records, operation, success) {
       if(!success) {
         this.rejectChanges();
       }
       this.setStatus(operation, success);
    },

    onDestroyRecords: function(records, operation, success) {
       if (success) {
            this.removed = [];
       } else {
         this.rejectChanges();
         this.fireEvent('changesrejected', records);
       }
       this.setStatus(operation, success);
    },

    setStatus: function(operation, success)  {
      if(success) {
         Ext.getCmp('main-status').setStatus({
                iconCls: 'x-status-saved',
                text: operation.getResultSet().message + Ext.Date.format(new Date(), ' g:i:s A')
         });
      } else {
         Ext.Msg.alert(operation.getError());
           
         Ext.getCmp('main-status').setStatus({
                iconCls: 'x-status-error',
                text: operation.getError() + Ext.Date.format(new Date(), ' g:i:s A')
         });
      }

    }

});

