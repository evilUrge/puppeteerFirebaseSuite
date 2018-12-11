exports.duck_search = {
    conf:{
      url: 'https://duckduckgo.com/'
    },
    selectors: {
        searchbar_textbox:'#search_form_input_homepage',
        specific_result: '#r1-{}',
        specific_result_title: '#r1-{} .result__title',
        more_result_button: '.result--more__btn btn btn--full'
    }
};
