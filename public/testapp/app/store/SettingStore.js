Ext.define("TestApp.store.SettingStore", {
    extend: 'Ext.data.Store',
    config: {
      autoLoad: true,
      model: 'TestApp.model.Setting',
      defaultRootProperty: 'items',
      proxy: {
        type: 'localstorage',
        id  : 'eppp-testapp-settings'
      }
    }
});