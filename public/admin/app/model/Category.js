Ext.define('Admin.model.Category', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'integer'},
        { name:'name', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: '/admin_category/',
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
