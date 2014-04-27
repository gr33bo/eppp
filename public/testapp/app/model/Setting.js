Ext.define('TestApp.model.Setting', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            "name", "value"

        ],
        identifier: 'uuid'
    }

});