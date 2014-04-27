/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'TestApp',

    requires: [
        'Ext.MessageBox',
        'Ext.device.Device',
        'Ext.device.Connection',
        'Ext.data.proxy.LocalStorage',
        'Ext.Ajax',
        'Ext.data.proxy.Rest'
    ],
    
    stores: [
      'SettingStore'
    ],
    models: [
      'Setting'
    ],
    
    controllers: [
      'Main'
    ],

    views: [
        'Main',
        'AboutPanel',
        'ExplanationPanel',
        'QuestionPanel'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('TestApp.view.Main'));
        
        var settingStore = Ext.getStore("SettingStore");
        var uuidRecord = settingStore.findRecord("name", "uuid");
        var uuid = "";
        if(uuidRecord){
          uuid = uuidRecord.get("value");
        } else {
          uuid = Ext.device.Device.uuid;
        }
        
        Ext.Ajax.request({
          url: domain+'/register',
          method: "POST",
          params: {
            uuid: uuid,
            platform: Ext.device.Device.platform,
            action: 'register'
          },
          success: function(response){
            var decoded = Ext.decode(response.responseText);
            if(decoded.uuid){
              if(!uuidRecord){
                var record = Ext.create('TestApp.model.Setting', {
                    name: 'uuid',
                    value: decoded.uuid
                });
                settingStore.add(record);
                settingStore.sync();
              }
            }
            console.log(response);
          }
      });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
