Ext.define('Admin.model.Exam', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'integer'},
        { name:'name', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: '/admin_exam/',
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
