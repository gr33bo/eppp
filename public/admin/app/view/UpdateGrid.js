Ext.define('Admin.view.UpdateGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.updategrid',
    stripeRows: true,
    columnLines: true,
    loadMask: true,
    requires: [
	 //     'Admin.store.IndustryStore',
	 //     'Admin.store.ArticleTypeStore'
    ],

    store: 'UpdateStore',
    columns: [
        {header: 'Id',  dataIndex: 'id',  width:50, hidden: true },
        {header: 'Created at',  dataIndex: 'created_at',  flex: 5 }
    ],
    tbar: [ {
          text: 'New',
          iconCls: 'icon-plus',
          action: 'new'
    }]
});
