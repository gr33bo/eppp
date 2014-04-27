Ext.define('Admin.view.articles.ArticleTabPanel', {
    extend: 'Ext.tab.Panel',
    alias : 'widget.articletabpanel',
    deferredRender: false,
    items: [
        {
          title: 'Tile Preview',
          xtype: 'articleimagepanel'
        },
        {
            xtype: 'articleform'
        },
        {
            xtype: 'articlehtmlform'
        }
        
    ]
});