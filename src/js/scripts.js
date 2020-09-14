(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    //js code
    // 4. Determine what radio button is selected (event listener)
    // 5. Swap pricing cards from monthly to yearly or vise versa
    $('fieldset.form-group').click(function() {
      if (this.dataset.default) {
        // show monthlyPricing cards setting display object with css
      } else {
        // show yearlPricing cards setting display object with css
      }
      console.log(this.dataset.default);
    });
    // nunjucks code is "{{}}"
  });

})(jQuery, window, document);
