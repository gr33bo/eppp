Ext.define('Admin.model.Update', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'integer', useNull: true},
        { name:'update_explanation', type:'string'},
        { name:'created_at', type:'date'}
    ],
    proxy: {
        type: 'rest',
        url: '/admin_update/',
        //actionMethods: { read   : 'POST' },
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            messageProperty: 'message',
            successProperty: 'success'
        }
    }
});
