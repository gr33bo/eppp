Ext.define('TestApp.model.Update', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        { name: 'text', type: 'string'},
        { name: 'created_at', type: 'string'}
      ]
    }
});