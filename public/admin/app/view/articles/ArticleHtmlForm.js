Ext.define('Admin.view.articles.ArticleHtmlForm' ,{

    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.articlehtmlform',
    record: null,
    readOnly: null,
    title: 'Edit/Preview',
    buttonAlign: 'center',
    buttons: [
      {
          xtype: 'button',
          text: 'Save Changes',
          action: 'update',
          margin: 5
      }
    ],
    mask: null,
    reload: function(){
      this.load(this.record, this.readOnly);
    },
    load: function(record, readOnly) {
        this.record = record;
        this.readOnly = readOnly;

//        var src = "http://"+window.location.host + "/admin/articles/preview/?title=" + record.get("title")+"&html="+record.get("html");
        var src = "http://"+window.location.host + "/admin/articles/preview/?id=" + record.get("id");
        
        if(!this.mask){
          this.mask = new Ext.LoadMask({msg:"Please wait...", target: this});
        }

        this.mask.show();

        this.setSrc(src, "Loading");

        new Ext.util.DelayedTask(function(){
            this.mask.hide();
            this.resetDirty();
        }, this, []).delay(1500);
    },
    editorIsDirty: false,
    resetDirty: function(){
      var iframe = this.getDOM(),
          ckeditor = iframe.contentWindow.CKEDITOR;

     if(ckeditor){
        var instances = ckeditor.instances;

        for(var key in instances){
          var instance = instances[key];
          instance.resetDirty();
        }
     }
          
    },
    checkDirty: function(){
      var iframe = this.getDOM(),
          ckeditor = iframe.contentWindow.CKEDITOR,
          instances = ckeditor.instances;

      for(var key in instances){
        var instance = instances[key];

        if(instance.checkDirty()){
          this.editorIsDirty = true;
        }
      }

      this.task = new Ext.util.DelayedTask( function(){
        this.checkDirty();
      }, this, [] ).delay(10000);
    }


});