Ext.define('Admin.view.QuestionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.questiongrid',
    stripeRows: true,
    columnLines: true,
    loadMask: true,
    requires: [
	 //     'Admin.store.IndustryStore',
	 //     'Admin.store.ArticleTypeStore'
    ],

    store: 'QuestionStore',
    columns: [
        {header: 'Id',  dataIndex: 'id',  width:50, hidden: true },
        {header: 'Num',  dataIndex: 'question_number', width: 50 },
        {header: 'Question',  dataIndex: 'question_text',  flex: 5 }
    ],
    tbar: [
      {
       xtype: 'combobox',
       itemId: 'exam-filter',

       store: 'ExamStore',
       queryMode: 'local',
       displayField: 'name',
       valueField: 'id',
       forceSelection: true,
        width: '20%'
 
      }, '-', {
          text: 'New',
          iconCls: 'icon-plus',
          action: 'new'
    }]
});
