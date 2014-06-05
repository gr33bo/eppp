Ext.define('Admin.view.UpdateForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.updateform',
    title : 'Edit Update',
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

   
      var updateText = {
           xtype: 'textarea',
           fieldLabel: 'Text',
           width: 500,
           height: 500,
           name: 'update_explanation',
           allowBlank: false
      };

      
      this.items = [
        updateText
      ];      
  
      this.callParent(arguments);
    }
});
