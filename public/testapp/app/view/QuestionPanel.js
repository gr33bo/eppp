Ext.define('TestApp.view.QuestionPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.questionpanel',
    config: {

      styleHtmlContent: true,
      scrollable: false,
      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      items: [
        {
          docked: 'top',
          xtype: 'toolbar',
          title: 'Practise Questions',
          items: [
            {
              iconCls: 'home',
              action: 'home',
              left: 0,
              top: 0
            }
          ]
        },
        {
          xtype: 'panel',
          html: 'blah',
          itemId: 'question-container',
//          scrollable: true,
          flex: 1
        },
        {
          xtype: 'formpanel',
          itemId: 'answer-container',
          items: [],
//          scrollable: true,
          flex: 2
        },
        {
          docked: 'bottom',
          flex: 1,
          layout: {
            type: 'hbox',
            align: 'middle'
          },
          items: [
            {
              xtype: 'button',
              text: 'Report Problem',
              ui: 'decline',
              flex: 1,
              margin: 10,
              action: 'report-question',
              cls: 'submit-button'
            },
            {
              xtype: 'button',
              text: 'View Answer Explanation',
              flex: 1,
              margin: 10,
              action: 'view-explanation',
              hidden: true,
              cls: 'submit-button'
            },
            {
              xtype: 'button',
              text: 'Skip Question',
              flex: 1,
              margin: 10,
              action: 'skip-question',
              cls: 'submit-button'
            },
            {
              xtype: 'button',
              text: 'Submit Answer',
              ui: 'confirm',
              flex: 1,
              margin: 10,
              action: 'submit-answer',
              cls: 'submit-button'
            }
            
          ]
        }
      ]
    },
    loadQuestion: function(record){
      this.record = record;
      this.down("#question-container").setHtml(record.get("text"));
      var answerContainer = this.down("#answer-container"); 
      answerContainer.removeAll();
      
      var correctAnswerId = null;
      
      var answers = [];
      Ext.each(record.get("answers"), function(answer){
        var answerField = {
            xtype: 'radiofield',
            name : 'answer',
            value: answer["id"],
            label: "<b>"+answer["identifier"]+":</b> "+answer["text"],
            labelWidth: '80%',
            labelWrap: true,
            correctAnswer: answer["is_correct_answer"]
            
        };
        if(answer["is_correct_answer"]){
          correctAnswerId = answer["id"];
        }
        
        answers.push(answerField);
      });
      
      this.correctAnswerId = correctAnswerId;
      
      answerContainer.add(answers);
      
      

      this.down("button[action=submit-answer]").show();
      this.down("button[action=skip-question]").setText("Skip Question");
      this.down("button[action=view-explanation]").hide();
      
//      answer_explanation: " A. In the DSM-IV-TR’s description of Axis II, Personality Disorders and Mental Retardation are classified on a separate axis as they “might otherwise be overlooked when attention is directed to the usually more florid Axis I disorders” and does not suggest “pathogenesis or range of appropriate treatment is fundamentally different from that for the disorders coded on Axis I.”"
//answers: Array[4]
//category: "Diagnosis and Psychopathology"
//id: 1543
//number: 35
//text: " Coding Personality Disorders on a separate axis, according to the DSM-IV-TR, is due to:"


//:identifier => a.answer_identifier,
//          :text => a.answer_text,
//          :is_correct_answer => a.is_correct_answer ? true : false
    }
});