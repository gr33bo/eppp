Ext.define('TestApp.store.QuestionStore', {
    extend: 'Ext.data.Store',
    config: {
      model: 'TestApp.model.Question',
      pageSize: 50,
      autoLoad: false,
      sorters: 'order_by',
      proxy: {
        type: 'rest',
        url: domain + '/questions',
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
