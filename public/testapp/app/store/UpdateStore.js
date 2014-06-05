Ext.define('TestApp.store.UpdateStore', {
    extend: 'Ext.data.Store',
    config: {
      model: 'TestApp.model.Update',
      pageSize: 50,
      autoLoad: true,
      //sorters: 'order_by',
      proxy: {
        type: 'rest',
        url: domain + '/updates',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total',
            messageProperty: 'message',
            successProperty: 'success'
        }
      }
    }
});
