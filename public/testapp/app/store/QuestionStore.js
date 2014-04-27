Ext.define('TestApp.store.QuestionStore', {
    extend: 'Ext.data.Store',
    config: {
      model: 'TestApp.model.Question',
      pageSize: 10,
      autoLoad: false,

      proxy: {
        type: 'rest',
        url: domain + '/questions',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total',
            messageProperty: 'message',
            successProperty: 'success'
        }
      },
      listeners : {
//        load: function(store, records, success) {
//          console.log(records.length);
//          console.log(this)
//            var settingsStore = Ext.data.StoreManager.lookup("SettingStore");
//            var rightMenu = Ext.getCmp("right-menu"),
//                industryList = rightMenu.down("#industry-list");
//
//            var industryId = settingsStore.findRecord("name", "industry_id");
//            if(industryId){
//              var industryRecord = store.findRecord("id", industryId.get("value"), 0, false, false, true);
//              industryList.select(industryRecord);
//              industryList.scrollToRecord(industryRecord);
//            }
//        }
      }
    }
});
