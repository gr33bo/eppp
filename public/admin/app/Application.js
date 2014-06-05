Ext.define('Admin.Application', {
    name: 'Admin',

    extend: 'Ext.app.Application',

    views: [
      'QuestionGrid',
      'AnswerGrid',
      'QuestionForm',
      'UpdateGrid',
      'UpdateForm'
    ],

    controllers: [
      'Question',
      'Update'
    ],

    models: [
      'Question',
      'Answer',
      'Category',
      'Exam',
      'Update'
    ],

    stores: [
        // TODO: add stores here
      'ExamStore',
      'AnswerStore',
      'CategoryStore',
      'QuestionStore',
      'UpdateStore'
    ]
});
