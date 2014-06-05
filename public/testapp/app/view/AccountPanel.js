Ext.define('TestApp.view.AccountPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accountpanel',
    config: {
      modal: true,
      centered: true,
      width: "90%",
      height: "90%",
      styleHtmlContent: true,
      style: 'opacity: 0.95;',
      itemId: 'account-panel',
      title: "Sign In",
      layout: 'auto',
          scrollable: {
              direction: 'vertical',
              directionLock: true
          },
      items: [
        {
          docked: 'top',
          xtype: 'titlebar',
          title: 'Sign In'
        },
        {
          html: 'Signing in will allow the app to track which questions you '+
                'get right and wrong, as well as which questions you have seen.<br/>'+
                'It is entirely optional. ',
          itemId: "sign-in-explanation"
        },
        {
          html: 'Enter a username and password below to register. Password must be at least 6 characters long.<br/>'+
                'Please note there is no password reset or retrieval mechanism, if you forgot your password you will '+
                'need to re-register with a different username.',
          itemId: "register-explanation",
          hidden: true
        },
        {
          xtype: 'textfield',
          name: 'username',
          label: 'Username',
          margin: '10 0 0 0',
          allowBlank: false
        },
        {
          xtype: 'passwordfield',
          name: 'password',
          label: 'Password',
          itemId: 'password',
          margin: '10 0 0 0',
          allowBlank: false
        },
        {
          xtype: 'passwordfield',
          itemId: 'password-confirmation',
          name: 'password_confirmation',
          label: 'Password<br/>Confirmation',
          margin: '10 0 0 0',
          allowBlank: false,
          hidden: true
        },
        {
          html: 'Never registered before? Click the button below!',
          margin: '20 0 0 0',
          itemId: "go-to-register"
        },
        {
          html: 'Already registered? Click the button below to sign in!',
          margin: '20 0 0 0',
          itemId: "go-to-sign-in",
          hidden: true
        },
        {
          xtype: 'button',
          text: 'Register',
          action: 'go-to-register'
        },
        {
          xtype: 'button',
          text: 'Sign In',
          action: 'go-to-sign-in',
          hidden: true
        },
        {
          docked: 'bottom',
          xtype: 'toolbar',
          layout: {
            type: 'hbox',
            align: 'middle',
            pack: 'center'
          },
          items: [
            {
                text: 'CLOSE',
                action: 'close',
                flex: 1
            },
            {
                text: 'SIGN IN',
                action: 'sign-in',
                flex: 1,
                ui: 'confirm'
            },
            {
                text: 'REGISTER',
                action: 'register',
                flex: 1,
                hidden: true,
                ui: 'confirm'
            }
          ]
        }
      ]
    }
});