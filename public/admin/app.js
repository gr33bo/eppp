/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'Ext.ux': '/admin/ux'//,
   // 'Ext': '/admin/ext/src'
  }
});

Ext.application({
    name: 'Admin',

    extend: 'Admin.Application',
    
    autoCreateViewport: true
});
