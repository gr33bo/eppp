Ext.define('Admin.view.QuestionForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.questionform',
    title : 'Edit Question',
    trackResetOnLoad: true,
    autoScroll: true,
    autoHeight: true,
    layout: 'vbox',
    buttonAlign : 'center',
    bodyStyle: 'padding:20px 20px 10px;',
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 200,
        msgTarget: 'side',
        anchor: '80%'
    },
    buttons : [{
                text: 'Save',
                action: 'update',
                formBind: true, //only enabled once the form is valid
                disabled: true
            }, {
                text: 'Create',
                action: 'create',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                hidden: true
            }, {
                text: 'Cancel',
                action: 'cancel',
                hidden: true
            }, {
                text: 'Undo',
                action: 'undo',
                handler: function() {
                  this.up('form').getForm().reset();
                },
                disabled: true
            }, {
                text: 'Reset',
                action: 'reset',
                handler: function() {
                  this.up('form').getForm().reset();
                },
                disabled: false,
                hidden: true
            }, {
                text: 'Delete',
                action: 'delete'
            }
    ],
    initComponent: function() {

      var questionNumber = {
        xtype: 'numberfield',
        name: 'question_number',
        fieldLabel: 'Number'   
      };

      var category = {
        xtype: 'combobox',
        fieldLabel: 'Question  Category',
        store: 'CategoryStore',
        queryMode: 'local',
        name: 'category_id',
        displayField: 'name',
        valueField: 'id',
        allowBlank: true,
        forceSelection: true
      };

      var questionText = {
           xtype: 'textarea',
           fieldLabel: 'Question',
           width: 500,
           height: 100,
           name: 'question_text',
           allowBlank: false
      };

      var explanationText = {
           xtype: 'textarea',
           fieldLabel: 'Answer Explanation',
           width: 600,
           height: 200,
           name: 'answer_explanation',
           allowBlank: false
      };
      
      this.items = [
        questionNumber,
        category,
        questionText,
        explanationText
      ];      
  
      this.callParent(arguments);
    }
});
