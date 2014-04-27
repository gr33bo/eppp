Ext.define('Admin.model.Answer', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'integer', useNull: true},
        { name:'question_id', type:'integer'},
        { name:'answer_text', type: 'string'},
        { name:'is_correct_answer', type: 'boolean'},
        { name:'answer_identifier', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        url: '/admin_answer/',
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
