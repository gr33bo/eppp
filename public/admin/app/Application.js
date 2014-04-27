Ext.define('Admin.Application', {
    name: 'Admin',

    extend: 'Ext.app.Application',

    views: [
      'QuestionGrid',
      'AnswerGrid',
      'QuestionForm'
    ],

    controllers: [
      'Question'
    ],

    models: [
      'Question',
      'Answer',
      'Category',
      'Exam'
    ],

    stores: [
        // TODO: add stores here
      'ExamStore',
      'AnswerStore',
      'CategoryStore',
      'QuestionStore'
    ]
});
