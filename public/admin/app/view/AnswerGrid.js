Ext.define('Admin.view.AnswerGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.answergrid',
    stripeRows: true,
    columnLines: true,
    loadMask: true,

    store: 'AnswerStore',
    columns: [
        {header: 'Id',  dataIndex: 'id',  width:50, hidden: true },
        {header: 'Id', dataIndex: 'answer_identifier', width: 50, editor: 'textfield'}, 
        {header: 'Answer',  dataIndex: 'answer_text',  flex: 5, editor: 'textfield' },
        {header: 'Correct?',  dataIndex: 'is_correct_answer', width: 100, editor: 'checkbox', renderer: function(value){ 
	    if(value){
	      return "Yes";
            } else {
              return "";
            }	
	  } 
	}
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],
    tbar: [
      {
          text: 'New',
          iconCls: 'icon-plus',
          action: 'new'
      },
      {
          text: 'Delete',
          iconCls: 'icon-minus',
          action: 'delete'
      }
    ]
});

