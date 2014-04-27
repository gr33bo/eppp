Ext.define('Admin.model.Question', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'integer', useNull: true},
        { name:'question_number', type:'integer'},
        { name:'question_text', type: 'string'},
        { name:'category_id', type: 'integer'},
        { name:'answer_explanation', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: '/admin_question/',
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
