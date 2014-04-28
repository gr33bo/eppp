Ext.define('TestApp.model.Question', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        { name: 'number', type: 'integer'},
        { name: 'text', type: 'string'},
        { name: 'category', type: 'string'},
        { name: 'answer_explanation', type: 'string'},
        { name: 'answers', type: 'auto'},
        { name: 'order_by', type: 'integer'}
      ]
    }
});